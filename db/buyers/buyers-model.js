const mongoose = require('mongoose');
const schema = require('./buyers-schema');
const model = mongoose.model('BuyersModel', schema);
module.exports = model;
