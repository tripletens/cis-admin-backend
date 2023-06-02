const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');

// Define routes
router.post('/update-home-video-url', settingsController.update);

module.exports = router;