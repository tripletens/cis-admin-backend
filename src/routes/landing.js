const express = require('express');
const router = express.Router();
const landingheroController = require('../controllers/landingpage/landingHeroController');

// Define routes
router.post('/hero-section/update', landingheroController.update);

module.exports = router;