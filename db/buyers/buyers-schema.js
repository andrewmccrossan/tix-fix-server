const mongoose = require('mongoose');
const schema = mongoose.Schema({
                                   _id: String,
                                   eventsBought: [String],
                                   eventsWishlist: [String],
                               }, {collection: "buyers"});
module.exports = schema;
