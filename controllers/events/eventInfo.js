const EventInfoModel = require("../../models/eventInfo");

exports.getEventDescription = async (req, res) => {
    const eventName = req.params.eventName;

    const eventInfo = await EventInfoModel.find({
        name: eventName,
    });

    return res.json({
        success: true,
        eventInfo: eventInfo,
    });
};

exports.addEventDescription = async (req, res) => {
    const eventName = req.body.eventName;
    const numberOfUsers = req.body.numberOfUsers;
    const prizes = req.body.prizes;
    const info = req.body.info;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;

    await EventInfoModel.create({
        name: eventName,
        numberOfUsers: numberOfUsers,
        prizes: prizes,
        info: info,
        startTime: startTime,
        endTime: endTime,
    });

    return res.json({
        success: true,
        message: "event info added",
    });
};
