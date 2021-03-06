const { validationResult, Result } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../../models/events/campuspreneur/user');

// exports.getSignup = (req,res,next) => {
//     res.render('signup');
// }

// exports.getLogin = (req,res,next) => {
//     res.render('login');
// }

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed!');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                email: email,
                username: username,
                password: hashedPassword,
                level: 1,
                timeLastSubmitted: Date.now()
            });
            return user.save();
        })
        .then(result => {
            res.status(201).json({
                user: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({ email: email })
        .then(user => {
            if(!user) {
                const error = new Error('Invalid email or password!!');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password,user.password);
        })
        .then(doMatch => {
            if(!doMatch) {
                const error = new Error('Invalid email or password!!');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign({
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            }, 
            'campuspreneurauthsecret',
            {expiresIn: '100h'});
            res.status(200).json({
                token: token,
                userId: loadedUser._id.toString()
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}