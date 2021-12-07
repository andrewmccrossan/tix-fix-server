const mongoose = require('mongoose');
const schema = require('./reviews-schema');
const model = mongoose.model('ReviewsModel', schema);
module.exports = model;
