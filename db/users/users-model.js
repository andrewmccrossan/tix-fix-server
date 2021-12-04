const mongoose = require('mongoose');
const schema = require('./users-schema');
const model = mongoose.model('UsersModel', schema);
module.exports = model;
