const { Router } = require('express');
const Avocado = require('../models/Avocado');

module.exports = Router()
  .post('/', (req, res, next) => {
    Avocado
      .create(req.body)
      .then(avocado => res.send(avocado))
      .catch(next);
  })

  .get('/avg-price-by-region', (req, res, next) => {
    const { count = 10 } = req.query;
    Avocado
      .getAvgPriceByRegion(Number(count))
      .then(regionPrices => res.send(regionPrices))
      .catch(next);
  })

  .get('/avg-price-by-year', (req, res, next) => {
    const { count = 10 } = req.query;
    Avocado
      .getAvgPriceByYear(Number(count))
      .then(yearlyPrices => res.send(yearlyPrices))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Avocado
      .findById(req.params.id)
      .then(avocado => res.send(avocado))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Avocado
      .find()
      .then(avocado => res.send(avocado))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Avocado
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(avocado => res.send(avocado))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Avocado
      .findByIdAndDelete(req.params.id)
      .then(avocado => res.send(avocado))
      .catch(next);
  });
