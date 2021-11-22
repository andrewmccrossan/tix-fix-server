const mongoose = require('mongoose');
const schema = require('./accounts-schema');
const model = mongoose.model('AccountsModel', schema);
module.exports = model;
