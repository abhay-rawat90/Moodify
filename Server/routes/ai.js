const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

router.post("/", async (req, res) => {
  const { moodText } = req.body;

  try {
    const prompt = `
I want you to act as a music recommendation AI. A user tells you their current mental state or mood, and you respond with a single song recommendation that best fits it.
and give me links of the videos that are available in india currently. Tell the title with Artist name or the channel name where it can be found on youtube.

Return the response in this format:
Title: <song title>

User's mood: "${moodText}"
`;

    // Call OpenRouter.ai API
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1:free", // free model on OpenRouter
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;

    // Parse the response to get Title and Link lines
    const [titleLine, linkLine] = reply.split("\n");
    const title = titleLine.replace("Title:", "").trim();

    res.json({ title });
  } catch (error) {
    console.error("AI error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to generate recommendation" });
  }
});

module.exports = router;
