const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const aboutUsRoute = require('./routes/aboutUs');

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

mongoose.connect(
    'mongodb+srv://developers:industrycell@cluster0.9pz2o.mongodb.net/test',
    {useNewUrlParser: true}
).then(result => {
    app.listen(4000);
}).catch(err => console.log(err));

