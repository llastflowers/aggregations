const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/aggregations', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const schema = new mongoose.Schema({
  date: Date,
  averageprice: Number,
  region: String
});

const Avocado = mongoose.model('Avocado', schema);

const fs = require('fs').promises;
const csv = require('csvtojson');

csv({
  delimiter: ','
})
  .fromFile('./avocado.csv')
 
  .then(json => {
    return Avocado.create(
      json.map(avocado => {
        return {
          date: avocado.Date,
          averageprice: avocado.AveragePrice,
          region: avocado.region
        };
      })
    );
  });
