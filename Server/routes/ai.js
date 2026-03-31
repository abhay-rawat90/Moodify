const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

router.post("/", async (req, res) => {
  const { moodText } = req.body;

  try {
    const systemInstruction = `
You are a music recommendation AI specialized in Indian and International music.
1. Recommend a song that matches the user's mood.
2. Ensure the song is available in India on both YouTube and Spotify.
3. If the song title is different on Spotify (e.g., includes "feat." or is a Remix), provide the exact Spotify title.
4. Suggest Bollywood Songs too and give song in the language user is communicating with.
5. Don't give same song every time in same mood, try to shuffle the song but it should match the mood.
6. STRICTLY follow this response format with no extra text:
Title: <YouTube Video Title>
SpotifyTitle: <Exact Spotify Song Name>
`;

    const userPrompt = `User's mood: "${moodText}"`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "nvidia/nemotron-3-super-120b-a12b:free",
        
        messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: userPrompt }
        ],
        
        temperature: 0.7, 
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://moodify-azure.vercel.app/", 
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
