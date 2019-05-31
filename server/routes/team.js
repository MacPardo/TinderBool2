'use strict';
const express = require('express');
const router = express.Router();
const aux = require('./routesAux');

const TeamModel = require('../models/TeamModel');

/**
 * @typedef {Object} Team
 * @property {String} teamName
 * @property {String} description
 * @property {String} accessType
 * @property {String[]} members (Lista de IDs)
 * @property {String} admin (sportsman ID)
 * @property {String} sport (ID do sport)
 */


/**
 * Cria o objeto para enviar por requisição através do time salvo no banco
 * @param {any} team 
 * @returns {Team}
 */
const teamReqPrepare = team => {
  /** @type {Team} */
  const teamRes = {
    teamName: team.teamName,
    description: team.description,
    accessType: team.accessType,
    members: team.members,
    sport: team.sport,
    admin: team.admin,
    id: team._id
  };

  return teamRes;
};

/**
 * Prepara um time recebido através de uma requisição para ser inserido no banco
 * @param {Team} team 
 * @returns {any}
 */
const teamDbPrepare = team => {
  return {
    teamName: team.teamName,
    description: team.description,
    accessType: team.accessType,
    members: team.members,
    sport: team.sport,
    admin: team.admin,
  };
}

router.post('/', (req, res) => {

  /** @type {Team} */
  const team = teamDbPrepare(req.body);

  const teamModel = new TeamModel(team);

  teamModel.save(err => {
    if (err) {
      console.log('error creating team');
      console.log(err);
      res.status(400).send();
    } else {
      res.status(201).send();
    }
  });
});

router.get('/', (req, res) => {
  TeamModel.find({}, (err, teams) => {
    const resTeams = teams.map(teamReqPrepare);

    if (err) {
      console.log('error getting all teams');
      console.log(err);
      res.status(400).send();
    } else {
      console.log('res teams::');
      console.log(resTeams);
      res.status(200).send(resTeams);
    }
  });
});

router.get('/:id', (req, res) => {
  TeamModel.findById(req.params.id, (err, team) => {
    const resTeam = teamReqPrepare(team);

    if (err) {
      console.log(`error getting team with id ${req.params.id}`);
      console.log(err);
      res.status(400).send();
    } else {
      res.status(200).send(resTeam);
    }
  });
});

router.put('/:id', (req, res) => {
  const team = teamDbPrepare(req.body);

  TeamModel.findOneAndUpdate({'_id': req.params.id}, team, (err, doc, updateRes) => {
    if (err) {
      console.log(`error updating team with id ${req.params.id}`);
      res.status(400).send();
    } else {
      res.status(200).send();
    }
  });
});

module.exports = router;