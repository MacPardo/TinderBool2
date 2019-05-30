'use strict';
const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    accessType : {
    	type: String,
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sportsman'
    }],
    sport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sport',
        required: true
    }
});

module.exports = TeamSchema;