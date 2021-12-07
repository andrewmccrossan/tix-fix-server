const mongoose = require('mongoose');
const schema = require('./transactions-schema');
const model = mongoose.model('TransactionsModel', schema);
module.exports = model;
