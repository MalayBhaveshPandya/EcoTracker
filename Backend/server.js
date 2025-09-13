// backend/server.js
const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const axios = require('axios');


dotenv.config();

const app = express();
const port =  5000;

app.use(cors());
app.use(express.json());


// Chat endpoint
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // Forward the message to the n8n webhook
    const webhookResponse = await axios.post(
      "https://temp23.app.n8n.cloud/webhook-test/device-assistant",
      { message },
      { headers: { "Content-Type": "application/json" } }
    );

    // Expecting the webhook to return { reply: "..." }
    const reply = webhookResponse.data.reply || webhookResponse.data;
    res.json({ reply });
  } catch (error) {
    console.error(error);
    // Forward n8n error hint to frontend if present
    if (error.response && error.response.data && error.response.data.hint) {
      return res.status(500).json({ error: error.response.data.hint });
    }
    res.status(500).json({ error: "Something went wrong with AI request" });
  }
});

app.use(cors({ origin: "https://eco-dashboard-five.vercel.app/" }));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
