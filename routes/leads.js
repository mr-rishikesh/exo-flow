const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

// Newsletter subscription - email only
router.post('/newsletter-subscribe', leadController.captureLeadNewsletterSubscribe);

// Magazine download - email + magazine title
router.post('/magazine-download', leadController.captureLeadMagazineDownload);

// Get featured - email, fullName, companyName, role
router.post('/get-featured', leadController.captureLeadGetFeatured);

// Masterclass registration - email, fullName, companyName, role, masterclassTitle, masterclassDate
router.post('/masterclass-register', leadController.captureLeadMasterclassRegister);

// Event attendance - email, fullName, companyName, role, eventName, eventDate
router.post('/event-register', leadController.captureLeadEventAttendance);

// Playbook access - email, fullName, companyName, role, playbookTitle
router.post('/playbook-access', leadController.captureLeadPlaybookAccess);

// General lead capture - email, fullName, companyName, role, purpose
router.post('/general', leadController.captureLeadGeneral);

module.exports = router;
