const express = require('express');

const router = express.Router();

const youngleadersController = require('../../controllers/admin/youngLeaders');
const isauth = require('../../middleware/young-is-auth');

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

// router.get('/add-question',youngleadersController.getAddQuestion);

router.post('/add-question',isauth,upload.single('image'),youngleadersController.postAddQuestion);

router.post('/edit-question',isauth, upload.single('image'),youngleadersController.postEditQuestion);

router.post('/delete-question',isauth, youngleadersController.postDeleteQuestion);

module.exports = router;
