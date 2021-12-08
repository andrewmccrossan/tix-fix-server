const mongoose = require('mongoose');
const schema = mongoose.Schema({
                                   _id: String,
                                   eventsSelling: [{
                                       eventID: String,
                                       price: Number,
                                       qty: Number,
                                   }],
                                   eventsWatchlist: [String],
                                   reviews: [String],
                               }, {collection: "sellers"});
module.exports = schema;
