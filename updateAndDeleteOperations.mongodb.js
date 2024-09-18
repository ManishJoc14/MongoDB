use("sample_mflix");

// NOTE - updateOne
// Updates the first matching document and applies the specified update
db.users.updateOne(
  { name: "Jaime Lannister" }, // Query to find the document
  { $set: { email: "ned@winterfelll.com" } } // Update only the 'email' field
);

// NOTE - updateMany
// Updates all documents that match the query

// NOTE - deleteOne
db.users.deleteOne({ name: "Jaime Lannister" });

// NOTE - deleteMany
// Deletes all documents that match the query
