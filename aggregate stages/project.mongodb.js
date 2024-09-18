// TODO - Project
//  $project: This is a projection stage that reshapes each document,
//  deciding which fields to include, exclude, or modify.
//  In this case, we are projecting two fields: name and numberOfHobbies.

//  name: 1: This includes the name field in the output.
//  numberOfHobbies: { $size: "$hobbies" }: This creates a new field named numberOfHobbies
//  and calculates its value using the $size operator.
//  The $size operator returns the number of elements in the array field hobbies.

//  NOTE - Find the total number of hobbies per user:
// db.students.aggregate([
//   {
//     $project: {
//       name: 1,
//       numberOfHobbies: { $size: "$hobbies" },
//     },
//   },
// ]);

// Output :
// [
//   {
//     "_id": {
//       "$oid": "66eb04be8e1579bcc7ddffcf"
//     },
//     "name": "John Doe",
//     "numberOfHobbies": 2
//   },
//   {
//     "_id": {
//       "$oid": "66eb04be8e1579bcc7ddffd0"
//     },
//     "name": "Jane Smith",
//     "numberOfHobbies": 2
//   },
//   {
//     "_id": {
//       "$oid": "66eb04be8e1579bcc7ddffd1"
//     },
//     "name": "Tom Johnson",
//     "numberOfHobbies": 2
//   },
//   {
//     "_id": {
//       "$oid": "66eb04be8e1579bcc7ddffd2"
//     },
//     "name": "Emily Davis",
//     "numberOfHobbies": 2
//   },
//   {
//     "_id": {
//       "$oid": "66eb04be8e1579bcc7ddffd3"
//     },
//     "name": "Alex White",
//     "numberOfHobbies": 2
//   }
// ]

// NOTE - Calculate Total Scores for Each Student
// Use the $project stage to calculate the total score (math + english + science) for each student.
// db.students.aggregate([
//   {
//     $project: {
//       name: 1,
//       totalScore: {
//         $add: ["$score.math", "$score.english", "$score.science"],
//       },
//     },
//   },
// ]);
