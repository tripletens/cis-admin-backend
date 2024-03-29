const express = require('express');

const router = express.Router();

const landingheroController = require('../controllers/landingpage/landingHeroController');

const landingKingsQueensController = require('../controllers/landingpage/landingKingsQueensController');

const landingOurApproachController = require('../controllers/landingpage/landingOurApproachController');

const landingOurProgramsController = require('../controllers/landingpage/landingOurProgramsController');

const landingBrandSupportController = require('../controllers/landingpage/landingBrandSupportController');

const landingMetricsController = require('../controllers/landingpage/landingMetricsController');

const landingUpdateImageController = require('../controllers/landingpage/landingUpdateImageController');

// Define routes
router.post('/hero-section/update', landingheroController.update);

router.post('/kings-queens-section/update', landingKingsQueensController.update);

router.post('/our-approach-section/update', landingOurApproachController.update);

router.post('/our-programs-section/update', landingOurProgramsController.update);

router.post('/brand-support-section/update', landingBrandSupportController.update);

router.post('/metrics-section/update', landingMetricsController.update);

router.post('/update-image/update', landingUpdateImageController.update);

// fetch all the landing page features

router.get('/brand-support-section/active', landingBrandSupportController.fetch_all);

router.get('/hero-section/active', landingheroController.fetch_all);

router.get('/kings-queens-section/active', landingKingsQueensController.fetch_all);

router.get('/our-approach-section/active', landingOurApproachController.fetch_all);

router.get('/our-programs-section/active', landingOurProgramsController.fetch_all);

router.get('/metrics-section/active', landingMetricsController.fetch_all);

router.get('/update-image/active', landingUpdateImageController.fetch_all);

module.exports = router;