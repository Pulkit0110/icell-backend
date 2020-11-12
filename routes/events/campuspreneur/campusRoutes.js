const express = require('express');

const router = express.Router();
const campusController = require('../../../controllers/events/campuspreneur/campusController');
const isauth = require('../../../middleware/is-auth');

router.get('/',isauth, campusController.getIndex);

router.get('/leaderboard',isauth,campusController.getLeaderboard);

module.exports = router;