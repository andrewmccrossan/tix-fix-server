const mongoose = require('mongoose');
const schema = require('./reviewers-schema');
const model = mongoose.model('ReviewersModel', schema);
module.exports = model;
