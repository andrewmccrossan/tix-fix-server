const mongoose = require('mongoose');
const schema = mongoose.Schema({
                                   _id: String,
                                   reviews: [String],
                                   eventsToDoList: [String],
                               }, {collection: "reviewers"});
module.exports = schema;
