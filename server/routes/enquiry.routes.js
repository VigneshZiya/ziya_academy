const express = require('express');
const enquiryController = require('../controller/enquiry.controller');

const router = express.Router();

router.post('/', enquiryController.submitEnquiry);

router.get('/test-email', async (req, res) => {
  try {
    const { sendEnquiryEmail } = require('./services/email.service');
    await sendEnquiryEmail({
      name: 'Test User',
      email: 'test@example.com',
      phone: '1234567890',
      category: 'test',
      message: 'This is a test message'
    });
    res.send('Email test succeeded');
  } catch (error) {
    console.error('Email test failed:', error);
    res.status(500).send('Email test failed: ' + error.message);
  }
});

module.exports = router;


