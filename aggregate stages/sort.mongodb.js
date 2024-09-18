// ANCHOR - SORT

// NOTE - Sort students by age in descending order.
db.students.aggregate([
    {
      $sort : {
        age: -1 // -1 for descending order and 1 for ascending order
      }
    }
  ])