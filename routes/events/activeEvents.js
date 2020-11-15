const express = require("express");
const router = express.Router();

const activeEventsController = require("../../controllers/events/activeEvents");

router.get("/activeEvents", activeEventsController.getActiveEvents);
router.post("/activeEvents/add", activeEventsController.addEvents);

module.exports = router;
