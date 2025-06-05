const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

// GET /api/youtube/search?songTitle=Imagine+Dragons+Demons


router.get("/search", async (req, res) => {
  const { songTitle } = req.query;

  if (!songTitle) {
    return res.status(400).json({ message: "Missing songTitle" });
  }

  const query = `${songTitle} official music video`;

  try {
    const ytRes = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        key: process.env.YOUTUBE_API_KEY,
        q: query,
        part: "snippet",
        maxResults: 5,
        type: "video",
        videoEmbeddable: "true",
      },
    });

    const items = ytRes.data.items;

    if (!items.length) {
      return res.status(404).json({ message: "No embeddable video found" });
    }

    const video = items[0];
    const videoId = video.id.videoId;
    const title = video.snippet.title;

    const link = `https://www.youtube.com/watch?v=${videoId}`;
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    res.json({ title, link, embedUrl });
  } catch (err) {
    console.error("YouTube API error:", err.message);
    res.status(500).json({ message: "YouTube search failed" });
  }
});

module.exports = router;