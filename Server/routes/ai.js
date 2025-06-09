const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

router.post("/", async (req, res) => {
  const { moodText } = req.body;

  try {
    const prompt = `
I want you to act as a music recommendation AI. A user tells you their current mental state or mood, and you respond with a single song recommendation that best fits it.
and give me titles of the videos that are available in india currently. Recommend th song that is avilable on both youtube and spotify.
But on Spotify song names are different so find what is the name of same song on on spotify. Add the additional information in titles so that th same song can be found easily.

Return the response in this format:
Title: <song title>
SpotifyTitle: <Spotify Song Title>

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
    const [titleLine, spotifyTitleLine] = reply.split("\n");
    const title = titleLine.replace("Title:", "").trim();
    const spotifyTitle = spotifyTitleLine.replace("SpotifyTitle:", "").trim();

    res.json({ title, spotifyTitle });
  } catch (error) {
    console.error("AI error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to generate recommendation" });
  }
});

module.exports = router;
