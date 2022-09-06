'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const projectSchema = new Schema({
  
});

const ProjectModel =mongoose.model('Project', projectSchema);

module.exports = ProjectModel;