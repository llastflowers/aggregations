require('dotenv').config();

const request = require('supertest');
const app = require('../app');
const connect = require('../utils/connect');
const mongoose = require('mongoose');
const Avocado = require('../models/Avocado');

describe('avocado routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let avocado;
  let date;
  beforeEach(async() => {
    date = new Date();
    avocado = await Avocado.create({
      date,
      averageprice: 150.00,
      region: 'Portland'
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a new avocado', () => {
    const date = new Date();
    return request(app)
      .post('/api/v1/avocados')
      .send({
        date,
        averageprice: 150.00,
        region: 'Portland'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          date: date.toISOString(),
          averageprice: 150.00,
          region: 'Portland',
          __v: 0
        });
      });
  });
});
