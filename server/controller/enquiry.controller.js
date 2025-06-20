const { sendEnquiryEmail } = require('../services/email.service');  // Add this at the top

exports.submitEnquiry = async (req, res) => {
  try {
    console.log('Request headers:', req.headers);
    
    const enquiryData = req.body;
    
    // Validation
    if (!enquiryData.name || !enquiryData.email || !enquiryData.phone || !enquiryData.category) {
      console.log('Validation failed - missing fields');
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all required fields' 
      });
    }

    // Send email
    console.log('Attempting to send email...');
    const emailSent = await sendEnquiryEmail(enquiryData);
    
    if (emailSent) {
      console.log('Email sent successfully');
      res.status(200).json({ 
        success: true, 
        message: 'Enquiry submitted successfully' 
      });
    } else {
      console.log('Email sending failed (no error thrown)');
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Controller Error:', error.stack);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'An error occurred while submitting your enquiry' 
    });
  }
};