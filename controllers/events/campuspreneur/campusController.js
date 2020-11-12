const User = require('../../../models/events/campuspreneur/user');
const Level = require('../../../models/events/campuspreneur/level');

const MAX_LEVEL = 20;

exports.getIndex = (req, res, next) => {
    User.findById(req.userId)
    .then(user => {
        if (!user) {
            const error = new Error('User Not Found!!');
            error.statusCode = 401;
            throw error;
        }
        Level.findOne({number: user.level})
        .then(level => {
            res.status(200).json({
                level: level,
                user: user
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.getLeaderboard = (req,res,next) => {
    User.find()
    .then(userDoc => {
        let users = [...userDoc];
        for(let i=0; i<users.length; i++) {
            for(let j=i; j<users.length-1; j++) {
                if(users[j].level > users[j+1].level) {
                    swap(users[j],users[j+1]);
                }
                if(users[j].level === users[j+1].level) {
                    if(users[j].timeLastSubmitted > users[j+1].timeLastSubmitted) {
                        swap(users[j],users[j+1]);
                    }
                }
            }
        }

        res.status(200).json({
            users: users
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.checkAnswer = (req,res,next) => {
    const answer = req.body.answer;
    User.findById(req.userId)
    .then(user => {
        if (!user) {
            const error = new Error('User Not Found!!');
            error.statusCode = 401;
            throw error;
        }
        const userLevel = user.level;
        Level.findOne({number: user.level})
        .then(level => {
            if(level.answer === answer) {
                user.level = min(userLevel+1,MAX_LEVEL);
                user.timeLastSubmitted = Date.now();
            }
            Level.findOne({number: user.level})
            .then(level => {
                res.status(200).json({
                    level: level,
                    user: user
                })
            })
            .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}