// seed the database
// db.customers.insertMany([
//   {
//     customer_id: 1,
//     name: "Alice",
//     email: "alice@example.com",
//     total_spent: 0,
//     orders: [],
//   },
//   {
//     customer_id: 2,
//     name: "Bob",
//     email: "bob@example.com",
//     total_spent: 0,
//     orders: [],
//   },
// ]);

// db.products.insertMany([
//   {
//     product_id: 1,
//     name: "Smartphone",
//     stock: 50,
//     price: 699.99,
//   },
//   {
//     product_id: 2,
//     name: "Laptop",
//     stock: 20,
//     price: 1099.99,
//   },
// ]);

// A session is required to run a transaction.

// NOTE - Let’s assume that Alice (customer_id: 1) wants to buy a Laptop (product_id: 2).
// The transaction will:
// 1. Deduct 1 unit of stock from the products collection.
// 2. Create a new order in the orders collection.
// 3. Update Alice's total spend and order history.

const session = db.getMongo().startSession();

try {
  session.startTransaction();

  const customerId = 1;
  const productId = 2;
  const quantity = 1;

  const product = db.products.findOneAndUpdate(
    { product_id: productId, stock: { $gte: quantity } },
    { $inc: { stock: -quantity } },
    { session }
  );

  if (!product) {
    throw new Error("Product is out of stock or not enough stock.");
  }

  const order = {
    customer_id: customerId,
    product_id: productId,
    product_name: product.name,
    quantity: quantity,
    price: product.price,
    order_date: new Date(),
  };

  db.orders.insertOne(order, { session });

  db.customers.updateOne(
    { customer_id: customerId },
    {
      $push: { orders: order },
      $inc: { total_spent: product.price * quantity },
    },
    { session }
  );

  session.commitTransaction();
  print("Transaction committed successfully.");
} catch (error) {
  session.abortTransaction();
  print("Transaction aborted due to an error:", error);
} finally {
  session.endSession();
}
