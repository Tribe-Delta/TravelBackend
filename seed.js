'use strict';

require('dotenv').config();

const { default: mongoose } = require('mongoose');
mongoose.connect(process.env.DB_URL);

const Location = require('./model.js');

async function seed() {
  await Location.create({
    id: '123456789',
    longitude: -122.330062,
    latitude: 47.603832,
    city: 'Seattle',
    state: 'Indiana',
    country: 'Iraq',
    capital: 'Paris',
    timezone: 'PST',
    flag: 'flagtest.svg',
    currency: 'USD',
    currencySymbol: '$',
    firstLanguage: 'English',
    secondLanguage: 'Spanish',
    email: 'fake@email.com',
    notes:''
    // conversion_rate: {type: String, required: false},
    // base_currency: {type: String, required: false}
  });

  mongoose.disconnect();
}

seed();
