// Insert sample data into the 'books' collection
// db.books.insertMany([
//   {
//     title: "JavaScript: The Good Parts",
//     description:
//       "A deep dive into the core features of JavaScript and how to use them effectively.",
//     author: "Douglas Crockford",
//     publication_year: 2008,
//   },
//   {
//     title: "Eloquent JavaScript",
//     description:
//       "A modern introduction to programming using JavaScript, covering both the fundamentals and advanced topics.",
//     author: "Marijn Haverbeke",
//     publication_year: 2018,
//   },
//   {
//     title: "You Don't Know JS",
//     description:
//       "A series of books that takes a detailed look at the intricacies of JavaScript.",
//     author: "Kyle Simpson",
//     publication_year: 2014,
//   },
//   {
//     title: "JavaScript: The Definitive Guide",
//     description:
//       "A comprehensive guide to JavaScript, covering all aspects of the language.",
//     author: "David Flanagan",
//     publication_year: 2020,
//   },
//   {
//     title: "JavaScript Allongé",
//     description:
//       "A guide to functional programming in JavaScript, with a focus on practical usage.",
//     author: "Reginald Braithwaite",
//     publication_year: 2014,
//   },
// ]);

// Create a text index on 'title' and 'description' fields
db.books.createIndex({ title: "text", description: "text" });

// To find books related to "JavaScript":
// db.books.find({
//   $text: {
//     $search: "JavaScript",
//   },
// });

// To sort the results by relevance:
// db.books
//   .find({
//     $text: {
//       $search: "JavaScript",
//     },
//   })
//   .sort({
//     score: {
//       $meta: "textScore",
//     },
//   });

// To search for exact phrases (e.g., "JavaScript: The Good Parts"):
// db.books.find({
//   $text: {
//     $search: '"JavaScript: The Good Parts"',
//   },
// });

// we can use aggregate also
// db.books.aggregate([
//   { $match: { $text: { $search: "JavaScript" } } },
//   { $project: { title: 1, score: { $meta: "textScore" } } },
//   { $sort: { score: -1 } },
// ]);

// $match filters the documents based on the text search query.
// $project includes the score field in the output. here (title : 1 means include title)
// $sort orders the results by the relevance score. here (socre: -1 means sort in descending order)
