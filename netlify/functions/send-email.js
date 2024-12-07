
console.log("Email user: ", process.env.EMAIL_USER); // Check if this is correctly loaded
console.log("Email pass: ", process.env.EMAIL_PASS); // Check if this is correctly loaded

const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {
    const { name, email, message } = JSON.parse(event.body);

    // Set up the Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Use Gmail or your preferred email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Replace with your email password
      },
    });

    // Email options
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // Replace with your email
      subject: `PORTFOLIO MESSAGE`,
      text: `Message from: ${name}\nEmail: ${email}\n\n${message}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to send email." }),
    };
  }
};
