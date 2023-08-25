const twilio = require("twilio");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail");

dotenv.config();

app.listen(5000, () => console.log("Listening on port 5000"));

const sendSMS = async () => {
  const client = new twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  return client.messages
    .create({
      body: "This is a test message",
      from: process.env.TWILIO_PHONE_NUMBER,
      to: [process.env.PHONE_NUMBER, process.env.TWILIO_PHONE_NUMBER],
    })
    .then((message) => console.log(`Message sent`));
};

const emailNotification = async () => {
  const sendMailClient = sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const messageBody = {
    to: "brendan@freeman.dev",
    from: {
      name: process.env.SENDGRID_EMAIL_NAME,
      email: process.env.SENDGRID_EMAIL,
    },
    subject: "test",
    text: "Test message",
    html: "<h1>Test message</h1>",
  };

  sendMailClient
    .send(messageBody)
    .then((response) => console.log("Email sent"));
};

sendSMS();
emailNotification();
