'use strict';


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);
const Location = require('./model.js');

const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3002;
// const Country = require('./location.js');

// Add Validation
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Our Mongoose is connected');
});

// API Routes
// app.get('/country', Country);


// Database Routes
app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});

// connect tis app.get to the location functions
app.get('/location', getLocationInfo);

async function getLocationInfo(request, response, next) {
  console.log('You are in the GET function');

  try {
    let results = await Location.find();
    response.status(200).send(results);
  } catch (error) {
    next(error);
  }
}

// app.post is needed to add a country (and notes?) to the database. 
app.post('/location', postLocationInfo);
async function postLocationInfo(request, response, next) {
  console.log('You are in the POST function');
  console.log(request.body);
  try {
    const newLocation = await Location.create(request.body);
    response.status(201).send(newLocation);
  } catch (error) {
    next(error);
  }
}

// app.put is needed to update notes

// app.delete


app.get('*', (request, response) => {
  response.status(404).send('Not available');
});

// ERROR
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});


app.listen(PORT, '127.0.0.1', () => console.log(`We are up on PORT: ${PORT}`));
