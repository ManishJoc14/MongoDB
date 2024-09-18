// ANCHOR - The $limit stage limits the number of documents returned.

// Example: Get the top 3 students sorted by age.
db.students.aggregate([
  {
    $sort: { age: -1 },
  },
  {
    $limit: 3,
  },
]);
