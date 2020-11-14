const express = require("express");
const router = express.Router();

const activeEventsController = require("../../controllers/events/activeEvents");

router.get("/activeEvents", activeEventsController.getActiveEvents);

module.exports = router;
