// Creating a Compound Index: Suppose you have a users collection where you often query based on both name and age. 
// To optimize such queries, you can create a compound index like this:

db.students.createIndex({ name: 1, age: 1 });
// This creates an index where name is sorted in ascending order (1), and within the same name, age is also sorted in ascending order (1).

// Query Using the Compound Index: With the compound index in place, 
// a query like this will be much faster:
db.students.find({ name: "John Doe", age: 25 }).explain("executionStats");


// NOTE - Partial Usage of the Index: MongoDB can also use the index for a query that only filters on name 
// (the first field in the compound index):
db.students.find({ name: "John Doe" }).explain("executionStats");

// NOTE - But if you query only by age, 
// MongoDB won’t fully utilize this compound index:
db.users.find({ age: 25 });  // Not optimized by the compound index