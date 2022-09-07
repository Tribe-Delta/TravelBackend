'use strict';

require('dotenv').config();

const { default: mongoose } = require('mongoose');
mongoose.connect(process.env.DB_URL);

const Location = require('./model.js');

async function seed() {
  await Location.create({
    id: '123456789',
    longitude: -122.330062,
    latatude: 47.603832,
    city: 'Seattle',
    state: 'Indiana',
    country: 'Iraq',
    capital: 'Paris',
    timezone: 'PST',
    flag: 'flagtest.svg',
    currency: 'USD',
    currencySymbol: '$',
    firstLanguage: 'English',
    secondLanguage: 'Spanish'
    // conversion_rate: {type: String, required: false},
    // base_currency: {type: String, required: false}
  });


  console.log('Timothee and Stepehen, You DID IT!!!!!');


  // await Location.create({
  //   title: 'The Hitchhiker\'s Guide to the Galaxy',
  //   description: 'Science Fiction',
  //   status: true
  // });


  // console.log('The Hitchhiker\'s Guide to the Galaxy was created.');


  // await Location.create({
  //   title: 'The Art of the Deal',
  //   description: 'Fiction',
  //   status: false
  // });


  // console.log('The Art of the Deal was ghost-written.');


  mongoose.disconnect();
}

seed();
