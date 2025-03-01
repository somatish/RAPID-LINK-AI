const express = require("express");
const twilio = require("twilio");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

app.post("/api/send-sos", async (req, res) => {
  const { contact } = req.body;

  if (!contact) return res.status(400).json({ message: "Contact required" });

  try {
    await client.messages.create({
      body: "🚨 SOS Alert! Your friend needs help!",
      from: process.env.TWILIO_PHONE_NUMBER,
      to: contact,
    });

    res.json({ message: "SOS sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error sending SOS", error });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
