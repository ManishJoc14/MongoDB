// ANCHOR - $out: Writes the Output to a New Collection
// The $out stage writes the output of the aggregation pipeline to a new collection. 
// NOTE - It's useful when you want to store the results permanently.

// Example: Write the result of the aggregation into a new collection called studentResults.
db.students.aggregate([
  {
    $addFields: {
      totalScore: {
        $add: ["$score.math", "$score.english", "$score.science"]
      }
    }
  },
  { $out: "studentResults" }
])