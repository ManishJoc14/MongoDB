

// ANCHOR - aggregate([]): The aggregate function is used to perform complex data transformations and calculations.
// It processes the documents in the students collection through a series of stages defined inside the array ([]).

// TODO - Group
// db.students.aggregate([
//   {
//     $group: {
//       _id: expression,
//       fieldN: {
//         accumulatorN: expressionN
//       }
//     }
//   }
// ])

// NOTE - Group students by gender and calculate average age
// db.students.aggregate([
//   {
//     $group: {
//       _id: "$gender",
//       avgerageAge: {
//         $avg: "$age",
//       },
//     },
//   },
// ]);

// _id: "$gender": This non-accumulator field groups documents by gender (e.g., "male", "female").
// Each unique value of gender will be grouped together.
// $avg: "$age": This accumulator field calculates the average age for each gender group.
// output :

// [
//   {
//     "_id": "male",
//     "avgerageAge": 27.333333333333332
//   },
//   {
//     "_id": "female",
//     "avgerageAge": 28.5
//   }
// ]

// NOTE - Group students by gender and calculate total age
// db.students.aggregate([
//   {
//     $group: {
//       _id: "$gender",
//       totalAge: {
//         $sum: "$age",
//       },
//     },
//   },
// ]);

// Output :
// [
//   {
//     "_id": "male",
//     "totalAge": 82
//   },
//   {
//     "_id": "female",
//     "totalAge": 57
//   }
// ]

// NOTE - Calculate the average score in math for all users
// db.students.aggregate([
//   {
//     $group: {
//       _id: null,
//       averageMathScore: {
//         $avg: "$score.math"
//       }
//     }
//   }
// ]);

// Output :
// [
//   {
//     "_id": null,
//     "averageMathScore": 83.6
//   }
// ]



