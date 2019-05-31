'use strict';

const express = require('express');
const app = express();
const router = require('./routes/routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

const dbConnectionString = 'mongodb://127.0.0.1/tinderbool';
mongoose.connect(dbConnectionString, {useNewUrlParser: true});
mongoose.connection.on('error', () => {
    console.log('there was an error connection to mongodb');
});

app.use(bodyParser.json());
app.use(session({secret: 'TinderBool'}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/', router);

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen('3000', () => {
    console.log('listening on port 3000');
});