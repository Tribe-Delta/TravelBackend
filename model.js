'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const locationSchema = new Schema({
  id: {type: String, required: true},
  longitude: {type: Number, required: true},
  latatude: {type: Number, required: true},
  city:{type: String, required: true},
  state: {type: String, required: false},
  country:{type: String, required: true},
  capital: {type: String, required: false},
  timezone: {type: String, required: true},
  flag:{type: String, required: false},
  currency:{type: String, required: true},
  currencySymbol:{type: String, required: false},
  firstLanguage: {type: String, required: true},
  secondLanguage:{type: String, required: false}
});

const ProjectModel = mongoose.model('Project', locationSchema);

module.exports = ProjectModel;


