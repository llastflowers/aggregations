const csv = require('csvtojson');
const Avocado = require('../models/Avocado');

function seedData() {
  return csv()
    .fromFile('./avocado.csv')
    .then(avocados => {
      return avocados.map(avocado => ({
        date: avocado.Date,
        averageprice: avocado.AveragePrice,
        region: avocado.region
      }));
    })
    .then(avocados => Avocado.create(avocados));
}

module.exports = {
  seedData
};
