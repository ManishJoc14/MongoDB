// ANCHOR - $addFields: Adds Computed Fields
// The $addFields stage is used to add new fields or update existing fields in documents. This can include calculations, string manipulations, or values derived from other fields.

// NOTE - Example: Add a field to calculate the total score for each student.

// db.students.aggregate([
//   {
//     $addFields: {
//       totalScore: {
//         $add: ["$score.math", "$score.english", "$score.science"],
//       },
//     },
//   },
// ]);

