'use strict';
const mongoose = require('mongoose');

const TeamSchema = require('./TeamSchema');

const TeamModel = mongoose.model('Team', TeamSchema);

module.exports = TeamModel;