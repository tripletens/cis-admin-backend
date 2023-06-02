const express = require('express');

const router = express.Router();

const aboutOurImpactController = require('../controllers/about/aboutOurImpactController');
const aboutFoundersVisionController = require('../controllers/about/aboutFoundersVisionController');

// Define routes
router.post('/founder-vision/update', aboutFoundersVisionController.update);
router.post('/our-impact/update', aboutOurImpactController.update);
router.post('/our-identity/update', aboutOurIdentityController.update);

module.exports = router;