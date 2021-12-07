const mongoose = require('mongoose');
const schema = require('./sellers-schema');
const model = mongoose.model('SellersModel', schema);
module.exports = model;
