'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app =express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002; 

app.listen(PORT, () => console.log(`We are up on PORT: ${PORT}`));

mongoose.connect(process.env.DB_URL);


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Our Mongoose is connected');
});

app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});


app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

// ERROR
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});
