const EventModel = require("../../models/event");
const constants = require("../../constants");

exports.getActiveEvents = async(req, res) => {
  let events = await EventModel.find({
    isActive:true
  });
  
  return res.status(200).json({
    success:true,
    events:events
  })
};

exports.addEvents = async (req, res) => {
  console.log(constants);
  const enventName = req.body.eventName;
  const activeStatus = req.body.activeStatus;

  let event = await EventModel.findOne({
    name:eventName
  });
  if(event==null){
    event = await EventModel.create({
      name: eventName,
      isActive: activeStatus,
      userTableName: constants.USER_TABLE,
      questionTableName: constants.QUESTION_TABLE
    });  
  }
    
  if(activeStatus)this.setActiveStatus(req);
  

  return res.json({
    success:true,
    message:'Event added'
  })
};

const generateName = (eventName) => {
  const timestamp = new Date().getTime();
  return eventName + timestamp;
};

exports.setActiveStatus = (req, res) => {
  let eventName = req.body.eventName;
  const tableName = generateName(eventName);
  const userTableName = "user_" + tableName;
  const questionTableName = "questions_" + tableName;

  EventModel.findOne({
    name:eventName
  }).then(event=>{
    event.isActive=true;
    event.userTableName=userTableName;
    event.questionTableName=questionTableName;
    event.save();
  }).then(event=>{
    console.log(event)
    return res.json({
      success:true,
      message:'Active Status Set'
    })
  })
};
exports.setInactiveStatus = (res, req) => {};
