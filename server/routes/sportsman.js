'use strict';
const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt');
const config  = require('../config');
const aux     = require('./routesAux');

const SportsmanModel = require('../models/SportsmanModel');

/**
 * Prepara a informação de um sportsman
 * vinda direto do banco para ser enviada
 * em uma requisição.
 * @param {Object} sportsman Enviado pelo SportsmanModel
 * @returns {Object} Pronto para ser enviado pela API
 */
const sportsmanReqPrepare = sportsman => ({
    userName: sportsman.userName,
    email: sportsman.email,
    cpf: sportsman.cpf,
    sportsInterest: sportsman.sports,
    gender: sportsman.gender,
    birthDate: sportsman.birthDate,
    id: sportsman._id,
    picture: ''
});

const sportsmanDbPrepare = sportsman => ({
    userName: sportsman.userName,
    password: sportsman.password,
    email: sportsman.email,
    cpf: sportsman.cpf,
    sportsInterest: sportsman.sports,
    gender: sportsman.gender,
    birthDate: sportsman.birthDate,
    picture: ''
});

router.post('/login', (req, res) => {
    SportsmanModel.findOne({ email: req.body.email }, async (err, sportsman) => {
        
        if (!sportsman) {
            res.status(404).send();
            return;
        }

        if (err) {
            res.status(500).send();
        } else {
            let authenticated = false;
            try {
                authenticated = await bcrypt.compare(req.body.password, sportsman.password);
            } catch (e) {
                res.send(400);
            }

            if (authenticated) { // password ok
                // TODO: inicializar session aqui
                req.session.user = sportsman;
                console.log('Login ok');
                res.status(200).send();
            } else {
                console.log('Login fail');
                res.status(401).send();
            }
        }
    });
});

router.post('/', async (req, res) => {

    const sportsmanPrep = sportsmanDbPrepare(req.body);
    const hash = await bcrypt.hash(req.body.password, config.BCRYPT_SALT_ROUNDS);
    sportsmanPrep.password = hash;

    console.log(`PASSWORD: ${req.body.password}\tHASH: ${hash}`);

    const sportsman = new SportsmanModel(sportsmanPrep);
    
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

//router.use(aux.authMiddleware);

router.get('/', (req, res) => {
    SportsmanModel.find({}, (err, sportspeople) => {
        console.log('callback running');
        if (err) {
            console.log('there was an error');
            res.status(404).send();
        } else {
            console.log('sportspeople are');
            console.log(sportspeople)

            const responseArray = sportspeople.map(sportsmanReqPrepare);
            res.send(responseArray);
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
            const response = sportsmanReqPrepare(sportsman);
            res.send(sportsman);
        }
    });
});

router.put('/:id', (req, res) => {
    // res.send(`edit sportsman with id = ${req.params.id}`);
    const sportsman = sportsmanDbPrepare(req.body);

    SportsmanModel.findOneAndUpdate({ '_id': req.params.id }, sportsman, (err, doc, updateRes) => {
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
            res.send({ "sports": sportsman.sports || [] });
        }
    });
});

module.exports = router;