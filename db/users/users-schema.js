const mongoose = require('mongoose');
const schema = mongoose.Schema({
                                   username: String,
                                   password: String,
                                   firstName: String,
                                   lastName: String,
                                   email: String,
                                   zip: String,
                                   initialArtistInterest: String,
                                   role: {type: String, enum: ['SELLER', 'BUYER', 'REVIEWER']}
                               }, {collection: "users"});
module.exports = schema;
