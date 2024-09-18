// ANCHOR - Unwind Hobbies and Count Frequency
// You can use $unwind to flatten the array of hobbies 
// and then count how many students have each hobby.


// Groups the documents by each hobby and sums 1 for every occurrence of that hobby. 
// This gives you the count of how many students have each hobby.

db.students.aggregate([
  { $unwind: "$hobbies" },
  {
    $group: {
      _id: "$hobbies",
      count: { $sum: 1 },
    },
  },
]);
