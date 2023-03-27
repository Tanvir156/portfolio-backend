const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();

// Enable cross-origin resource sharing
app.use(cors());
app.use(bodyParser.json());
// Enable JSON body parsing
app.use(express.json());

// Handle POST requests to /contact
app.post("/sendEmail", (req, res) => {
  const { email, type, message } = req.body;
  console.log(message);
  // Create a Nodemailer transport object
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "demo525203@gmail.com", // Replace with your own Gmail address
      pass: "ffxhdqqpeimwiotp", // Replace with your own Gmail password
    },
  });

  // Set up the message options
  const messageOptions = {
    from: email,
    to: "demo2525203@gmail.com", // Replace with your own email address
    subject: `New message from portfolio`,
    text: message + " " + type + " " + email,
  };

  // Send the message using the transporter object
  transporter.sendMail(messageOptions, (error, info) => {
    if (error) {
      console.error("Error sending message:", error);
      res.status(500).send("Error sending message");
    } else {
      console.log("Message sent:", info.response);
      res.status(200).send("Message sent successfully");
    }
  });
});

// Start the server
app.listen(5000, () => {
  console.log("Server started on port 3000");
});
