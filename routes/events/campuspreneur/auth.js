const express = require('express');
const {body} = require('express-validator/check');

const User = require('../../../models/events/campuspreneur/user');
const authController = require('../../../controllers/events/campuspreneur/auth');

const router = express.Router();

router.get('/signup', authController.getSignup);

router.get('/login', authController.getLogin);

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

module.exports = router;