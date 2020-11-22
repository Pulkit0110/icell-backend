const Sponsors = require("../models/sponsors");

exports.getAboutUs = (req, res, next) => {
  Sponsors.find()
    .then(sponsors => {
      res.status(200).json({
        success: true,
        sponsors: sponsors
      });
    })
    .catch(err => {
      console.log(err);
    });
};
