'use strict';
const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    teamName: {
        type: String
    },
    description: {
        type: String
    },
    accessType : {
    	type: String
    },
    menbers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sportsman'
    }]
});

module.exports = TeamSchema;