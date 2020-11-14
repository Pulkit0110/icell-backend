const EventModel = require("../../models/event");

exports.getActiveEvents = (req, res) => {};

exports.addEvents = (req, res) => {
  const eventName = req.body.eventName;
  const activeStatus = req.body.activeStatus;

  const event = EventModel.create({
    name: eventName,
    isActive: activeStatus,
    userTableName: "userTable",
    questionTableName: "questionTable"
  });
  console.log(event);

  // if(activeStatus)
};

const generateName = eventName => {
  const timestamp = new Date().getTime();
  return eventName + timestamp;
};

exports.setActiveStatus = (req, res) => {
  let eventName = req.body.eventName;
  const tableName = generateName(eventName);
  const userTableName = "user_" + tableName;
  const questionTableName = "questions_" + tableName;
};
exports.setInactiveStatus = (res, req) => {};
