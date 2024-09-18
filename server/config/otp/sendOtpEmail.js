const nodemailer = require('nodemailer');

// Function to send email
const sendOtpEmail = (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use other services like SendGrid, etc.
    auth: {
      user: 'nkfxbuisness@gmail.com',
      pass: process.env.app_password,
    },
  });

  const mailOptions = {
    from: 'nkfxbuisness@gmail.com',
    to: email,
    subject: 'OTP for Email Verification || Revenue Distribution',
    text: `Your OTP code is: ${otp}. Please use this code to verify your email.`,

    // HTML version of the email (for email clients that support HTML)
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center;">
        <p style="font-size: 20px; color: #555;">Your One Time Password is</p>
        <p style="font-size: 30px; color: #3182ce;">${otp}</p>
      </div>
    `,

  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
module.exports = sendOtpEmail;