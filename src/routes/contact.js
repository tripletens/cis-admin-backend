const express = require('express');

const router = express.Router();

const contactTextController = require('../controllers/contact/contactTextController');
const contactContactController = require('../controllers/contact/contactContactController');
const contactSocialMediaController = require('../controllers/contact/contactSocialMediaController');

// Define routes
router.post('/contact-us-text/update', contactTextController.update);
router.post('/contact-us-contact/update', contactContactController.update);
router.post('/contact-us-social-media/update', contactSocialMediaController.update);

module.exports = router;