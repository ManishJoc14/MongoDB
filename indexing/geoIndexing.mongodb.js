// seeding the database with some restaurants
// db.restaurants.insertMany([
//     {
//       name: "Pizza Palace",
//       location: { type: "Point", coordinates: [-73.935242, 40.730610] } // New York
//     },
//     {
//       name: "Sushi Spot",
//       location: { type: "Point", coordinates: [-118.243683, 34.052235] } // Los Angeles
//     },
//     {
//       name: "Burger Haven",
//       location: { type: "Point", coordinates: [-122.419418, 37.774929] } // San Francisco
//     },
//     {
//       name: "Pasta Corner",
//       location: { type: "Point", coordinates: [-74.0060, 40.7128] } // New York City
//     },
//     {
//       name: "Taco Land",
//       location: { type: "Point", coordinates: [-87.629799, 41.878113] } // Chicago
//     }
//   ]);

// Create a 2dsphere index on the location field
db.restaurants.createIndex({ location: "2dsphere" });

// Let’s say you’re in New York City at coordinates [ -73.9851, 40.7588 ],
// and you want to find restaurants within a 5-kilometer radius:

db.restaurants.find({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [ -73.9453, 40.7588 ] },
      $maxDistance: 5000, // distance in meters (5 km)
    },
  },
});
