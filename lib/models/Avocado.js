const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  date: Date,
  averageprice: Number,
  region: String
});

schema.statics.getNumDataPointsPerRegion = function() {
  return this.aggregate([
    {
      '$group': {
        '_id': '$region', 
        'count': {
          '$sum': 1
        }
      }
    }
  ]);
};

module.exports = mongoose.model('Avocado', schema);
