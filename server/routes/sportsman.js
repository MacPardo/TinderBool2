'use strict';
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const config = require('../config');

const SportsmanModel = require('../models/SportsmanModel');

router.get('/', (req, res) => {
    SportsmanModel.find({}, (err, sportspeople) => {
        console.log('callback running');
        if (err) {
            console.log('there was an error');
            res.status(404).send();
        } else {
            console.log('sportspeople are');
            console.log(sportspeople)
            res.send(sportspeople);
        }
    });
});

router.get('/:id', (req, res) => {
    SportsmanModel.findById(req.params.id, (err, sportsman) => {
        console.log('sportsman:');
        console.log(sportsman);
        if (err) {
            res.status(404).send();
        } else {
            res.send(sportsman);
        }
    });
});

router.post('/', async (req, res) => {

    const hash = await bcrypt.hash(req.body.password, config.BCRYPT_SALT_ROUNDS);

    console.log(`PASSWORD: ${req.body.password}\tHASH: ${hash}`);

    const sportsman = new SportsmanModel({
        ...req.body,
        password: hash
    });
    console.log(sportsman);
    sportsman.save(err => {
        if (err) {
            console.log('could not save');
            console.log(err);
            res.status(400).send();
        } else {
            console.log('saved successfully');
            res.status(201).send();
        }
    });
});

router.post('/login', (req, res) => {
    SportsmanModel.findOne({userName: req.body.userName}, async (err, sportsman) => {
        if (err) {
            res.status(500).send();
        } else {
            const authenticated = await bcrypt.compare(req.body.password, sportsman.password);

            if (authenticated) { // password ok
                // TODO: inicializar session aqui
                console.log('Login ok');
                res.status(200).send();
            } else {
                console.log('Login fail');
                res.status(401).send();
            }
        }
    });
});

router.put('/:id', (req, res) => {
    res.send(`edit sportsman with id = ${req.params.id}`);

    SportsmanModel.findOneAndUpdate({'_id': req.params.id}, req.body, (err, doc, updateRes) => {
        if (err) {
            console.log('failed to update');
            res.status(400).send();
        } else {
            console.log('did update');
            res.status(201).send();
        }
    });
});

router.get('/:id/sports', (req, res) => {
    SportsmanModel.findById(req.params.id, (err, sportsman) => {
        if (err) {
            res.status(404).send();
        } else {
            console.log('found', sportsman)
            res.send({"sports": sportsman.sports || []});
        }
    });
});

module.exports = router;