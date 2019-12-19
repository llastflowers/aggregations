const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  date: Date,
  averageprice: Number,
  region: String
});

schema.statics.getAvgPriceByRegion = function(n = 10) {
  return this.aggregate([
    {
      '$group': {
        '_id': '$region', 
        'avgPriceByRegion': {
          '$avg': '$averageprice'
        }
      }
    }, {
      '$sort': {
        'avgPriceByRegion': 1
      }
    }, {
      '$limit': n
    }
  ]);
};

schema.statics.getAvgPriceByYear = function(n = 10) {
  return this.aggregate([
    {
      '$group': {
        '_id': {
          '$dateToString': {
            'date': '$date', 
            'format': '%Y'
          }
        }, 
        'avgPriceByYear': {
          '$avg': '$averageprice'
        }
      }
    }, {
      '$sort': {
        'avgPriceByYear': 1
      }
    }, {
      '$limit': n
    }
  ]);
};

module.exports = mongoose.model('Avocado', schema);
