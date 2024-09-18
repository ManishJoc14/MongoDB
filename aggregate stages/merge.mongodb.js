// $merge: Writes Results Back into an Existing Collection
// The $merge stage writes the output of the aggregation pipeline back into an existing collection. 
// You can either insert new documents or update existing ones.

// Example: Merge the results into the students collection by updating the totalScore field for each student.
db.students.aggregate([
  {
    $addFields: {
      totalScore: {
        $add: ["$score.math", "$score.english", "$score.science"]
      }
    }
  },
  { $merge: { into: "students", on: "_id", whenMatched: "merge", whenNotMatched: "insert" } }
])