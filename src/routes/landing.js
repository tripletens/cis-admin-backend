const express = require('express');

const router = express.Router();

const landingheroController = require('../controllers/landingpage/landingheroController');

const landingKingsQueensController = require('../controllers/landingpage/landingOurApproachController');

const landingOurApproachController = require('../controllers/landingpage/landingOurApproachController');

const landingOurProgramsController = require('../controllers/landingpage/landingOurProgramsController');

// Define routes
router.post('/hero-section/update', landingheroController.update);

router.post('/kings-queens-section/update', landingKingsQueensController.update);

router.post('/our-approach-section/update', landingOurApproachController.update);

router.post('/our-programs-section/update', landingOurProgramsController.update);


module.exports = router;