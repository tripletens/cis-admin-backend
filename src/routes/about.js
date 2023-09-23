const express = require('express');

const router = express.Router();

const aboutOurImpactController = require('../controllers/about/aboutOurImpactController');
const aboutFoundersVisionController = require('../controllers/about/aboutFoundersVisionController');
const aboutOurIdentityController = require('../controllers/about/aboutOurIdentityController');

// Define routes
router.post('/founder-vision/update', aboutFoundersVisionController.update);
router.post('/our-impact/update', aboutOurImpactController.update);
router.post('/our-identity/update', aboutOurIdentityController.update);

// fetch active ones
router.get('/founder-vision/active', aboutFoundersVisionController.fetch_all);
router.get('/our-identity/active', aboutOurIdentityController.fetch_all);
router.get('/our-impact/active', aboutOurImpactController.fetch_all);

module.exports = router;