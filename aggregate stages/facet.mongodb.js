// ANCHOR - $facet: Runs Multiple Pipelines
// The $facet stage allows you to run multiple aggregation pipelines in parallel and get their results in one go. It's useful for performing different kinds of operations on the same dataset.

// NOTE - Example: Run two pipelines, one to count the students and another to find the average age.
db.students.aggregate([
  {
    $facet: {
      studentCount: [{ $count: "totalStudents" }],
      averageAge: [{ $group: { _id: null, avgAge: { $avg: "$age" } } }],
    },
  },
]);
