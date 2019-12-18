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

  it('gets an avocado by id', () => {
    return request(app)
      .get(`/api/v1/avocados/${avocado.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: avocado.id,
          date: date.toISOString(),
          averageprice: 150.00,
          region: 'Portland',
          __v: 0
        });
      });
  });

  it('gets all avocados', () => {
    return request(app)
      .get('/api/v1/avocados')
      .then(res => {
        expect(res.body).toEqual([
          {
            _id: avocado.id,
            date: date.toISOString(),
            averageprice: 150.00,
            region: 'Portland',
            __v: 0
          }
        ]);
      });
  });

  it('updates an avocado', () => {
    return request(app)
      .patch(`/api/v1/avocados/${avocado.id}`)
      .send({ region: 'Seattle' })
      .then(res => {
        expect(res.body).toEqual({
          _id: avocado.id,
          date: date.toISOString(),
          averageprice: 150.00,
          region: 'Seattle',
          __v: 0
        });
      });
  });

  it('deletes an avocado', () => {
    return request(app)
      .delete(`/api/v1/avocados/${avocado.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: avocado.id,
          date: date.toISOString(),
          averageprice: 150.00,
          region: 'Portland',
          __v: 0
        });
      });
  });
});
