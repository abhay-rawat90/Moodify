const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

router.get("/token", async (req, res) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const tokenUrl = "https://accounts.spotify.com/api/token";

  const headers = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
    },
  };

  const body = new URLSearchParams({
    grant_type: "client_credentials",
  });

  try {
    const response = await axios.post(tokenUrl, body, headers);
    res.json(response.data); // Contains access_token and expires_in
  } catch (err) {
    console.error("Error fetching Spotify token", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch token" });
  }
});

router.get("/link", async (req, res) => {
  const title = req.query.title;
  if (!title) return res.status(400).json({ error: "Missing song title" });

  try {
    // Step 1: Get Spotify access token
    const tokenRes = await axios.get(`${process.env.VITE_API_BASE_URL}/spotify/token`); // Adjust to deployed URL if needed
    const token = tokenRes.data.access_token;

    // Step 2: Search Spotify using the title from AI
    const searchRes = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: title,
        type: "track",
        limit: 1,
      },
    });

    const track = searchRes.data.tracks.items[0];
    if (!track) return res.status(404).json({ error: "Track not found" });

    // Step 3: Respond with useful Spotify data
    res.json({
      name: track.name,
      artist: track.artists[0].name,
      spotifyUrl: track.external_urls.spotify,
      previewUrl: track.preview_url,
    });
  } catch (err) {
    console.error("Spotify search failed", err.response?.data || err.message);
    res.status(500).json({ error: "Spotify search failed" });
  }
});

module.exports = router;
