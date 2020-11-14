const Question = require('.././../models/events/YoungLeaders/question');

exports.getAddQuestion = (req,res,next) => {
    res.render('add-question');
}

exports.postAddQuestion = (req,res,next) => {
    const number = req.body.number;
    const image = req.file;
    console.log(image);
    const questionType = req.body.questionType;
    const score = req.body.score;
    const answer = req.body.answer;
    const statement = req.body.statement;
    const op1 = req.body.op1;
    const op2 = req.body.op2;
    const op3 = req.body.op3;
    const op4 = req.body.op4;
    const imageUrl = '/'+ image.path;

    const ques = new Question({
        number: number,
        questionType: questionType,
        score: score,
        answer: answer,
        statement: statement,
        option1: op1,
        option2: op2,
        option3: op3,
        option4: op4,
        imageUrl: imageUrl  
    });

    ques.save()
    .then(result => {
        res.status(201).json({
            question: result,
            message: "Question added successfully"
        });
    })
    .catch(err => {
        console.log(err);
    })
}

exports.postEditQuestion = (req,res,next) => {
    const id = req.params.id;
    const number = req.body.number;
    const image = req.file;
    const questionType = req.body.questionType;
    const score = req.body.score;
    const answer = req.body.answer;
    const statement = req.body.statement;
    const op1 = req.body.op1;
    const op2 = req.body.op2;
    const op3 = req.body.op3;
    const op4 = req.body.op4;
    const imageUrl = '/'+ image.path;

    Question.findById(id)
    .then(question => {
        question.number = number;
        question.questionType= questionType;
        question.score= score;
        question.answer= answer;
        question.statement= statement;
        question.option1= op1;
        question.option2= op2;
        question.option3= op3;
        question.option4= op4;
        question.imageUrl= imageUrl;
        return question.save();  
    })
    .then(res => {
        res.status(201).json({
            question: result,
            message: "Question edited successfully"
        });
    })
    .catch(err => {
        console.log(err);
    });
}

exports.postDeleteQuestion = (req,res,next) => {
    const quesId = req.body.quesId;
    // Question.findById(quesId)
    // .then(question => {
    //     return 
        Question.deleteOne({_id: quesId})
    // })
    .then(result => {
        console.log("Successfully deleted!!");
        res.status(201).json({
            message: "Successfully deleted!!"
        });
    })
    .catch(err => {
        console.log(err);
    })
}