'use strict';
const express = require('express');
const router  = express.Router();
const aux     = require('./routesAux');

const SportModel = require('../models/SportModel');

/**
 * Prepara a informação de um sportsman
 * vinda direto do banco para ser enviada
 * em uma requisição.
 * @param {Object} sport Enviado pelo SportsmanModel
 * @returns {Object} Pronto para ser enviado pela API
 */
const sportReqPrepare = sport => ({
  sportName: sport.sportName,
  minPeople: sport.minPeople
});

const sportDbPrepare = sport => ({
  sportName: sport.sportName,
  minPeople: sport.minPeople
});

router.use(aux.authMiddleware);

router.get('/', (req, res) => {
    // get all sports
    const sportName = req.query.sportName; // filter by name

    SportModel.find({sportName: new RegExp(sportName, "i")}, (err, modelRes) => {
        if (err) {
            console.log('could not find sport');
            res.status(404).send();
        } else {
            console.log('found sport', modelRes);
            res.send(modelRes);
        }
    });
});

router.get('/:id', (req, res) => {
    // get sport with id = req.params.id
    // res.send(`sport with id = ${req.params.id}`);

    SportModel.findById(req.params.id, (err, modelRes) => {
        if (err) {
            console.log('could not find sport with id', req.params.id);
            res.status(404).send();
        } else {
            console.log('found ', modelRes);
            res.send(modelRes);
        }
    });
});

router.post('/', async (req, res) => {

    const sportPrep = sportDbPrepare(req.body);
    const sport = new SportModel(sportPrep);

    console.log(sport);
    sport.save(err => {
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

module.exports = router;
