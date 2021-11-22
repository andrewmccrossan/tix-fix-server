const mongoose = require('mongoose');
const schema = mongoose.Schema({
    userName: String,
    password: String,
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    zipCode: String,
    role: {type: String, enum: ['SELLER', 'BUYER', 'REVIEWER']}
}, {collection: "accounts"});
module.exports = schema;
