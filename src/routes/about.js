const express = require('express');

const router = express.Router();

const aboutFoundersVisionController = require('../controllers/about/aboutFoundersVisionController');


// Define routes
router.post('/founder-vision/update', aboutFoundersVisionController.update);


module.exports = router;