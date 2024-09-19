
// IXSCAN(indexed scan) is faster because MongoDB can directly access the relevant documents
// via the index, rather than scanning the entire collection.


// query without index
db.students.find({name: "John Doe"}).explain("executionStats");

// create index
// name : 1 -> ascending order 
// name : -1 -> descending order
db.students.createIndex({name: 1});
db.students.find({name: "John Doe"}).explain("executionStats");

// get indexes
db.students.getIndexes()

// drop index
db.students.dropIndex({name: 1});


