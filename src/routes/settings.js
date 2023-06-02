const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');

// Define routes
router.post('/home-video-url/update', settingsController.update);

module.exports = router;