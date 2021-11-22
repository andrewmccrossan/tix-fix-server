const mongoose = require('mongoose');
import { schema } from './accounts-schema';
// const schema = require('./accounts-schema');
const model = mongoose.model('AccountsModel', schema);
module.exports = model;
