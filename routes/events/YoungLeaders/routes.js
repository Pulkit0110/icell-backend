const express = require('express');
const {body} = require('express-validator/check');

const User = require('../../../models/events/YoungLeaders/user');
const authController = require('../../../controllers/events/YoungLeaders/auth');
const mainController = require('../../../controllers/events/YoungLeaders/mainController');
const isauth = require('../../../middleware/young-is-auth');

const router = express.Router();

// router.get('/signup', authController.getSignup);

// router.get('/login', authController.getLogin);

router.post('/signup',[
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value,{req}) => {
        return User.findOne({email: value})
        .then(user => {
            if(user) {
                return Promise.reject('E-mail address already exists.');
            }
        });
    })
    .normalizeEmail()
], authController.signup);

router.post('/login', authController.login);

router.get('/question/:questionNum',isauth,mainController.getQuestion);

router.post('/checkAnswer',isauth,mainController.checkAnswer);

router.post('/submit',isauth,mainController.submit);

router.get('/leaderboard',isauth,mainController.getLeaderboard);

module.exports = router;
