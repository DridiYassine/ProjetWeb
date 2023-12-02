const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3003;
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "ouimade.contact@gmail.com",
    pass: "obft yibr osem cdvc",
  },
});

app.post("/api/send-email", async (req, res) => {
  const { user_name, user_email, card_number } = req.body;

  try {
    // Create the HTML content of the email
    const emailContent = `
      <h2>Order Confirmation</h2>
      <p>Full Name: ${user_name }</p>
      <p>Email: ${user_email}</p>
      <p>Card Number: ${card_number}</p>
     
      </ul>
    `;

    // Send the email
    const info = await transporter.sendMail({
      from: "ouimade.contact@gmail.com", // Replace with your Gmail email
      to: user_email,
      subject: "Order Confirmation",
      html: emailContent,
    });

    console.log("Email sent:", info.response);
    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).json({ error: "Error sending email." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});