const EventInfoModel = require("../../models/eventInfo");

exports.getEventDescription = async (req, res) => {
  const eventName = req.params.eventName;

  const eventInfo = await EventInfoModel.find({
    name: eventName
  });

  if (eventInfo == null) {
    res.json({
      success: false,
      message: "Event not found",
      eventInfo: {}
    });
  }

  return res.json({
    success: true,
    eventInfo: eventInfo
  });
};

exports.addEventDescription = async (req, res) => {
  const eventName = req.body.eventName;
  const numberOfUsers = req.body.numberOfUsers;
  const prizes = req.body.prizes;
  const info = req.body.info;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const imageUrl = req.body.imageUrl;
  const rules = req.body.rules;
  const faqs = req.body.faqs;

  await EventInfoModel.create({
    name: eventName,
    numberOfUsers: numberOfUsers,
    prizes: prizes,
    info: info,
    startTime: startTime,
    endTime: endTime,
    imageUrl: imageUrl,
    rules: rules,
    faqs: faqs
  });

  return res.json({
    success: true,
    message: "event info added"
  });
};
