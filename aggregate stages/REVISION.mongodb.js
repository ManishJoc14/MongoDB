// seed the db
// db.books.insertMany([
//   {
//     title: "JavaScript: The Good Parts",
//     author: "Douglas Crockford",
//     genre: "Programming",
//     published_year: 2008,
//     ratings: 4.5,
//     pages: 172,
//     publisher: "O'Reilly Media"
//   },
//   {
//     title: "Eloquent JavaScript",
//     author: "Marijn Haverbeke",
//     genre: "Programming",
//     published_year: 2018,
//     ratings: 4.7,
//     pages: 450,
//     publisher: "No Starch Press"
//   },
//   {
//     title: "Clean Code",
//     author: "Robert C. Martin",
//     genre: "Programming",
//     published_year: 2008,
//     ratings: 4.8,
//     pages: 464,
//     publisher: "Prentice Hall"
//   },
//   {
//     title: "The Pragmatic Programmer",
//     author: "Andrew Hunt",
//     genre: "Programming",
//     published_year: 1999,
//     ratings: 4.6,
//     pages: 352,
//     publisher: "Addison-Wesley"
//   },
//   {
//     title: "The Great Gatsby",
//     author: "F. Scott Fitzgerald",
//     genre: "Fiction",
//     published_year: 1925,
//     ratings: 4.4,
//     pages: 218,
//     publisher: "Scribner"
//   },
//   {
//     title: "To Kill a Mockingbird",
//     author: "Harper Lee",
//     genre: "Fiction",
//     published_year: 1960,
//     ratings: 4.9,
//     pages: 336,
//     publisher: "J.B. Lippincott & Co."
//   },
//   {
//     title: "1984",
//     author: "George Orwell",
//     genre: "Fiction",
//     published_year: 1949,
//     ratings: 4.8,
//     pages: 328,
//     publisher: "Secker & Warburg"
//   },
//   {
//     title: "Pride and Prejudice",
//     author: "Jane Austen",
//     genre: "Fiction",
//     published_year: 1813,
//     ratings: 4.7,
//     pages: 279,
//     publisher: "T. Egerton"
//   },
// ]);

// REVIEW - Find all books published after the year 2000.

db.books.aggregate([
  {
    $match: {
      published_year: {
        $gt: 2000,
      },
    },
  },
]);

// REVIEW - Group the books by their genre and count how many books are there in each genre.

db.books.aggregate([
  {
    $unwind: "$genre", // flatten if array and remove if null
  },
  {
    $group: {
      _id: "$genre", // group by genre
      count: {
        $sum: 1, // count each genre
      },
    },
  },
]);

// REVIEW - Group the books by their genre and calculate the average rating for each genre.
db.books.aggregate([
  {
    $unwind: "$genre",
  },
  {
    $group: {
      _id: "$genre",
      averageRating: {
        $avg: "$ratings",
      },
    },
  },
]);

// REVIEW - Find the Top 3 Highest Rated Books
db.books.aggregate([
  {
    $sort: {
      ratings: -1, // descending order sort on ratings
    },
  },
  {
    $limit: 3,
  }, // limit top 3
]);

// REVIEW - Find the total number of pages for all books published by a specific publisher (e.g., "Addison-Wesley")
db.books.aggregate([
  {
    $match: {
      publisher: "Addison-Wesley",
    },
  },
  {
    $group: {
      _id: "$publisher",
      totalPages: {
        $sum: "$pages",
      },
    },
  },
]);

// REVIEW - Find the total number of books published by each author.
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      totalBooks: {
        $sum: 1,
      },
    },
  },
]);

// REVIEW - Find Books Published in the 21st Century with Ratings Above 4.5
db.books.aggregate([
  {
    $match: {
      published_year: {
        $gt: 2000,
      },
      ratings: {
        $gt: 4.5,
      },
    },
  },
]);

// REVIEW - Use the $project stage to create a new field called description that combines
// the title and author fields into a single string. The description field should be in the format: "Title by Author".
// Include only this new description field along with the published_year for books with ratings between 4.5 and 5.

db.books.aggregate([
  {
    $match: {
      ratings: {
        $gt: 4.5,
        $lt: 5,
      },
    },
  },
  {
    $project: {
      published_year: 1,
      description: {
        $concat: ["$title", " by ", "$author"],
      },
    },
  },
]);

// REVIEW - Find all books with ratings greater than 4.5.
// For each book, calculate a new field ratingCategory based on the rating:
// "Excellent" for ratings greater than or equal to 4.8
// "Very Good" for ratings between 4.5 and 4.7
// "Good" for ratings between 4.0 and 4.5
// Also, include the title, author, and the newly calculated ratingCategory in the final output.

db.books.aggregate([
  {
    $match: {
      ratings: {
        $gt: 4.5,
      },
    },
  },
  {
    $addFields: {
      ratingCategory: {
        $switch: {
          branches: [
            { case: { $gte: ["$ratings", 4.8] }, then: "Excellent" },
            {
              case: {
                $and: [{ $gt: ["$ratings", 4.5] }, { $lt: ["$ratings", 4.8] }],
              },
              then: "Very Good",
            },
            {
              case: {
                $and: [{ $gt: ["$ratings", 4.0] }, { $lte: ["$ratings", 4.5] }],
              },
              then: "Good",
            },
          ],
          default: "Not Categorized",
        },
      },
    },
  },
  {
    $project: {
      title: 1,
      author: 1,
      ratingCategory: 1,
    },
  },
]);

// REVIEW - Filter books with ratings between 4.5 and 4.9.
// Add a field is21stCentury to indicate if the published_year is after 2000.
// Project to show title, author, ratings, published_year, and is21stCentury

db.books.aggregate([
  {
    $match: {
      ratings: {
        $gt: 4.5,
        $lt: 4.9,
      },
    },
  },
  {
    $addFields: {
      is21stCentury: {
        $gt: ["$published_year", 2000],
      },
    },
  },
  {
    $project: {
      title: 1,
      author: 1,
      published_year: 1,
      is21stCentury: 1,
    },
  },
]);