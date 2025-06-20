const nodemailer = require('nodemailer');
const emailConfig = require('../config/email.config');

const transporter = nodemailer.createTransport({
  service: emailConfig.service,
  auth: emailConfig.auth
});

console.log('Using email config:', emailConfig);
console.log('Sending to:', process.env.EMAIL_TO);

const sendEnquiryEmail = async (enquiryData) => {
  try {
    const mailOptions = {
      from: `"Ziya Academy Website" <${emailConfig.auth.user}>`,
      to: process.env.EMAIL_TO,
      subject: 'New Enquiry from Ziya Academy Website',
      html: generateEmailContent(enquiryData)
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

const generateEmailContent = (data) => {
  return `
    <h2>New Enquiry Received</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Interested In:</strong> ${data.category}</p>
    ${data.school_class ? `<p><strong>Class:</strong> ${data.school_class}</p>` : ''}
    ${data.internship ? `<p><strong>Internship Program:</strong> ${data.internship}</p>` : ''}
    ${data.it_service ? `<p><strong>IT Service:</strong> ${data.it_service}</p>` : ''}
    <p><strong>Message:</strong></p>
    <p>${data.message || 'No message provided'}</p>
    <hr>
    <p>This enquiry was submitted on ${new Date().toLocaleString()}</p>
  `;
};

module.exports = { sendEnquiryEmail };  