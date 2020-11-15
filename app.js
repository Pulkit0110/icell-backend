const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const aboutUsRoute = require("./routes/aboutUs");
const campusAuthRoutes = require("./routes/events/campuspreneur/auth");
const campusRoutes = require("./routes/events/campuspreneur/campusRoutes");
const activeEventsRoutes=require('./routes/events/activeEvents');
const eventInfoRoutes=require('./routes/events/eventinfo');

const youngLeadersRoutes = require('./routes/events/YoungLeaders/routes');

const youngleaderadminRoutes = require('./routes/admin/youngLeaders');

const sponsorAdminRoutes = require('./routes/admin/sponsors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.set("view engine", "ejs");
app.set("views", "views");

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(aboutUsRoute);
app.use("events/campuspreneur", campusAuthRoutes);
app.use("events/campuspreneur", campusRoutes);
app.use(activeEventsRoutes);
app.use(eventInfoRoutes);

app.use('/events/youngleaders',youngLeadersRoutes);

app.use('/admin-control/youngleader',youngleaderadminRoutes);
app.use('/admin-control',sponsorAdminRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(statusCode).json({
    message: message,
    data: data
  });
});

mongoose
  .connect(
    "mongodb+srv://developers:industrycell@cluster0.9pz2o.mongodb.net/test",
    { useNewUrlParser: true }
  )
  .then(result => {
    app.listen(4000);
    console.log('server started')
  })
  .catch(err => console.log(err));
