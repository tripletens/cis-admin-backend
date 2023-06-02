const express = require('express');
const router = express.Router();

const landingheroController = require('../controllers/landingpage/landingheroController');

const landingKingsQueensController = require('../controllers/landingpage/landingKingsQueensController');


// Define routes
router.post('/hero-section/update', landingheroController.update);

router.post('/kings-queens-section/update', landingKingsQueensController.update);

module.exports = router;