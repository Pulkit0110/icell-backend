const express = require('express');

const router = express.Router();

const aboutUsController = require('../controllers/aboutUs');

router.get('/aboutus',aboutUsController.getAboutUs);

module.exports = router;