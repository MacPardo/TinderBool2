const express = require('express');
const router = express.Router();

const sportsmanRouter = require('./sportsman');
const sportRouter = require('./sport');
const teamRotuer = require('./team');

router.use('/sportsman', sportsmanRouter);
router.use('/sport', sportRouter);
router.use('/team', teamRotuer);

module.exports = router;