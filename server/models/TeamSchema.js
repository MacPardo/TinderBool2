'use strict';
const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true,
        unique: true
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
    },
    admin: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sportsman'
    }
});

module.exports = TeamSchema;