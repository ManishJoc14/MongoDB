// ANCHOR - Lookup Stage:
// The $lookup stage performs a left outer join to another collection. It is used to join data from two collections.

// NOTE - join courses collection with teachers collection based on the course_name field.

// db.courses.aggregate([
//   {
//     $lookup: {
//       from: "teachers",
//       localField: "course_name",
//       foreignField: "course_name",
//       as: "courseTeacher",
//     },
//   },
// ]);

db.courses.aggregate([
  {
    $lookup: {
      from: "teachers",
      localField: "course_name",
      foreignField: "course_name",
      as: "courseTeacher",
    },
  },
  {
    $unwind: "$courseTeacher", // Unwind the courseTeacher array to a single object (to flatten the array)
  },
  {
    $project: {
      _id: 1,
      student_id: 1,
      course_name: 1,
      grade: 1,
      courseTeacher: "$courseTeacher.name", // Project only the teacher's name
    },
  },
]);
