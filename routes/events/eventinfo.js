const express = require("express");
const router = express.Router();

const eventInfoController = require("../../controllers/events/eventInfo");

router.get("/:eventName/info", eventInfoController.getEventDescription);

router.post("/add-event-info", eventInfoController.addEventDescription);

module.exports = router;
