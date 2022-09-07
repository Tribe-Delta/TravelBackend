'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);
const verifyUser = require('./auth.js');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

// Required-in comoponents
const Location = require('./model.js');
const getMapbox = require('./location.js');

// Add Validation
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Our Mongoose is connected');
});

app.use(verifyUser);

// API Routes

// Database Routes
app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});

// Request
app.get('/location', getLocationInfo);

async function getLocationInfo(request, response, next) {
  console.log('You are in the GET function');
  try {
    let results = await Location.find({email: request.user.email});
    response.status(200).send(results);
  } catch (error) {
    next(error);
  }
}

// Create: Add a country (and notes?) to the database. 
app.post('/location', postLocationInfo);

async function postLocationInfo(request, response, next) {
  console.log('You are in the POST function');
  // console.log(request.body.cityName);
  let newLoc = await getMapbox(request.body.cityName, request.user.email);
  try {
    const newLocation = await Location.create({...newLoc, email: request.user.email});
    response.status(201).send(newLocation);
  } catch (error) {
    next(error);
  }
}

// Delete
app.delete('/location/:locationid', deleteLocationInfo);

async function deleteLocationInfo(request, response, next) {
  console.log('Youre inside of the DELETE function');
  const id = request.params.locationid;
  console.log(id);
  try {
    await Location.findByIdAndDelete(id);
    response.status(204).send('success!');
  } catch (error) {
    next(error);
  }
}

// Update
app.put('/location/:locationid', putLocationInfo);

async function putLocationInfo(request, response, next) {
  console.log('Youre inside of the PUT function');
  let id = request.params.locationid;
  console.log(id);
  try {
    let data = request.body;
    const updateLocation = await Location.findByIdAndUpdate(id, {...data, email: request.user.email}, {new: true, overwrite: true});
    response.status(203).send(updateLocation);
  } catch (error) {
    next(error);
  }
}

// Catchall
app.get('*', (request, response) => {
  response.status(404).send('Not available');
});

// ERROR
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});


app.listen(PORT, '127.0.0.1', () => console.log(`We are up on PORT: ${PORT}`));
