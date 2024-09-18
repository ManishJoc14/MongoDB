// ANCHOR - $bucket: Groups Documents into Buckets
// The $bucket stage groups documents into buckets based on a range of values, much like a histogram.

// NOTE - Example: Group students by their total score into different ranges (buckets).
db.students.aggregate([
    {
      $bucket: {
        groupBy: { $add: ["$score.math", "$score.english", "$score.science"] },
        boundaries: [200, 220, 240, 260],
        default: "Other",
        output: {
          count: { $sum: 1 },
          students: { $push: "$name" }
        }
      }
    }
  ])
  
