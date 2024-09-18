// ANCHOR - FIND OPERATIONS

// Select the database to use
use("sample_mflix");

// ANCHOR - FIND OPERATIONS

// Find all documents
db.users.find();

// find one by name
db.users.findOne({ name: "Ned Stark" });

// find one by email
db.users.findOne({ email: "sean_bean@gameofthron.es" });

// ANCHOR - MODIFY OPERATIONS

// Find and modify (updates the first matching document)
// This is an older method
db.users.findAndModify({
  query: { name: "Ned Stark" }, // Query to find the document
  update: { $set: { name: "Ned Stark2" } }, // Update operation
  new: true, // Return the updated document
});

// NOTE - This method is mostly used nowadays
// Find and update (updates the first matching document and returns the updated one)
db.users.findOneAndUpdate(
  { name: "Ned Stark" }, // Query to find the document
  { $set: { name: "Ned Stark2" } }, // Update only the 'name' field
  { new: true } // Return the updated document
);

// Update one or more fields while keeping the rest of the document intact
db.users.findOneAndUpdate(
  { name: "Ned Stark2" }, // Query to find the document
  { $set: { email: "sean_bean@gameofthron.esm" } }, // Update only the 'email' field
  { new: true } // Return the updated document
);

// Replace the entire document with a new one
db.users.findOneAndReplace(
  { name: "Ned Stark2" }, // Query to find the document
  { name: "Ned Stark" }, // New document to replace the old one
  { returnDocument: "after" } // Return the modified document
);

// Find one document by name after replacement
db.users.findOne({ name: "Ned Stark" });

// ANCHOR - DELETE OPERATIONS
db.users.findOneAndDelete({ name: "Ned Stark" });

