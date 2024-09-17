// const collection  = {
//     "_id": ObjectId("..."),
//     "date": ISODate("2024-06-15T00:00:00Z"),
//     "store": "Store A",
//     "items": [
//         {
//             "name": "item1",
//             "quantity": 5,
//             "price": 10.0
//         },
//         {
//             "name": "item2",
//             "quantity": 3,
//             "price": 20.0
//         }
//     ]
// }

db.collection.aggregate([
  {
    // Split items array into separate documents
    $unwind: "$items",
  },
  {
    $project: {
      store: 1,
      month: { $substr: ["$date", 0, 7] },
      revenue: { $multiply: ["$items.quantity", "$items.price"] }, // Calculate revenue for each item
      price: "$items.price", // Price of each item
    },
  },
  {
    $group: {
      _id: { store: "$store", month: "$month" }, // Group by store and month
      totalRevenue: { $sum: "$revenue" }, // Total revenue for each store per month
      averagePrice: { $avg: "$price" }, // Calculate average price of items sold
    },
  },
  {
    $project: {
      _id: 0,
      store: "$_id.store", // Store name
      month: "$_id.month", // Month
      totalRevenue: 1, // Total revenue
      averagePrice: 1, // Average price
    },
  },
  {
    // Sort results by store and by month
    $sort: { store: 1, month: 1 },
  },
]);
