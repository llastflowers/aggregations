const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  date: Date,
  averageprice: Number,
  region: String
});

module.exports = mongoose.model('Avocado', schema);
