const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

// Define routes
router.post('/add', staffController.add);

module.exports = router;