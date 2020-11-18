const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const aboutUsRoute = require("./routes/aboutUs");
const campusAuthRoutes = require("./routes/events/campuspreneur/auth");
const campusRoutes = require("./routes/events/campuspreneur/campusRoutes");
const activeEventsRoutes = require("./routes/events/activeEvents");
const eventInfoRoutes = require("./routes/events/eventinfo");
const teamsRoutes = require("./routes/teams");

const youngLeadersRoutes = require("./routes/events/YoungLeaders/routes");

const youngleaderadminRoutes = require("./routes/admin/youngLeaders");

const sponsorAdminRoutes = require("./routes/admin/sponsors");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/", (req, res) => {
  res.send("Welcome to Icell Backend");
});

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
app.use(teamsRoutes);

app.use("/events/youngleaders", youngLeadersRoutes);

app.use("/admin-control/youngleader", youngleaderadminRoutes);
app.use("/admin-control", sponsorAdminRoutes);

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
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true })
  .then(result => {
    app.listen(PORT);
    console.log("server started");
  })
  .catch(err => console.log(err));
