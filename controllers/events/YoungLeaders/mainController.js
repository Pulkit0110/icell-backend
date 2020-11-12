const User = require('../../../models/events/YoungLeaders/user');
const Question = require('../../../models/events/YoungLeaders/question');

const NO_OF_QUESTIONS = 20;

exports.getQuestion = (req, res, next) => {
    User.findById(req.userId)
    .then(user => {
        if (!user) {
            const error = new Error('User Not Found!!');
            error.statusCode = 401;
            throw error;
        }
        if(user.hasSubmitted) {
            const error = new Error('User has already given the test!');
            error.statusCode = 400;
            throw error;
        }
        const question = req.params.questionNum;
        Question.findOne({number: question})
        .then(ques => {
            res.status(200).json({
                ques: ques,
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

exports.checkAnswer = (req,res,next) => {
    const answer = req.body.answer;
    const questionNum = req.body.questionNum;
    User.findById(req.userId)
    .then(user => {
        if (!user) {
            const error = new Error('User Not Found!!');
            error.statusCode = 401;
            throw error;
        }
        const userScore = user.score;
        Question.findOne({number: questionNum})
        .then(ques => {
            if(ques.answer === answer) {
                user.score = userScore+ques.score;
            }
            Question.findOne({number: questionNum+1})
            .then(question => {
                res.status(200).json({
                    ques: question,
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

exports.submit = (req,res,next) => {
    User.findById(req.userId) 
    .then(user => {
        if (!user) {
            const error = new Error('User Not Found!!');
            error.statusCode = 401;
            throw error;
        }
        user.hasSubmitted = true;
        user.timeSubmitted = Date.now();
        res.status(200).json({
            user: user,
            message: 'Test submitted successfully!'
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
                if(users[j].score > users[j+1].score) {
                    swap(users[j],users[j+1]);
                }
                if(users[j].score === users[j+1].score) {
                    if(users[j].timeSubmitted > users[j+1].timeSubmitted) {
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
