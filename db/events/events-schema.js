const mongoose = require('mongoose');
// I don't think _id is necessary since we can set that from seatgeek
const schema = mongoose.Schema({
                                   _id: String,
                                   buyers: [String],
                                   sellers: [String],
                               }, {collection: "events"});
module.exports = schema;
