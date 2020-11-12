const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const aboutUsRoute = require('./routes/aboutUs');
const campusAuthRoutes = require('./routes/events/campuspreneur/auth');
const campusRoutes = require('./routes/events/campuspreneur/campusRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(aboutUsRoute);
app.use('events/campuspreneur',campusAuthRoutes);
app.use('events/campuspreneur',campusRoutes);

app.use((error,req,res,next) => {
    console.log(error);
    const statusCode = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(statusCode).json({
        message: message,
        data: data
    });
});

mongoose.connect(
    'mongodb+srv://developers:industrycell@cluster0.9pz2o.mongodb.net/test',
    {useNewUrlParser: true}
).then(result => {
    app.listen(4000);
}).catch(err => console.log(err));

