const express = require('express');

const router = express.Router();

const contactTextController = require('../controllers/contact/contactTextController');
const contactContactController = require('../controllers/contact/contactContactController');
const contactSocialMediaController = require('../controllers/contact/contactSocialMediaController');

// Define routes
router.post('/contact-us-text/update', contactTextController.update);
router.post('/contact-us-contact/update', contactContactController.update);
router.post('/contact-us-social-media/update', contactSocialMediaController.update);

// fetch all the contact us features 
router.get('/contact-us-contact/active', contactContactController.fetch_all);
router.get('/contact-us-text/active', contactTextController.fetch_all);
router.get('/contact-us-social-media/active', contactSocialMediaController.fetch_all);

module.exports = router;