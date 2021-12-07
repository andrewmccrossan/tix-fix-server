const mongoose = require('mongoose');
const schema = require('./events-schema');
const model = mongoose.model('EventsModel', schema);
module.exports = model;
