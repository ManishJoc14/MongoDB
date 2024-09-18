
// NOTE - Filter users with math scores greater than 80 and less then 90:

db.students.aggregate([
  {
    $match: {
      "score.math": { $gt: 80 , $lt: 90}
    }
  }
])