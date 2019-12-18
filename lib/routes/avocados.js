const { Router } = require('express');
const Avocado = require('../models/Avocado');

module.exports = Router()
  .post('/', (req, res, next) => {
    Avocado
      .create(req.body)
      .then(avocado => res.send(avocado))
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
