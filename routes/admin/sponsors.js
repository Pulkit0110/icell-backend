const express = require('express');

const router = express.Router();

const isauth = require('../../middleware/admin-is-auth');
const sponsorController = require('../../controllers/admin/sponsors');

const multer = require('multer');
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

var upload = multer({storage: fileStorage, fileFilter: fileFilter});

router.post('/add-sponsor',isauth,upload.single('image'),sponsorController.addSponsors);

module.exports = router;