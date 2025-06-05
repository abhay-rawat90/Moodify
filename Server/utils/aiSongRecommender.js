const axios = require("axios");

const recommendSongFromMood = async (moodText) => {
  try {
    const res = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // use gpt-4 if you want
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that recommends music based on mood.",
          },
          {
            role: "user",
            content: `I'm feeling: ${moodText}. Suggest a song (title and artist) I can listen to.`,
          },
        ],
        max_tokens: 50,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = res.data.choices[0].message.content;
    return reply;
  } catch (err) {
    console.error("OpenAI Error:", err.message);
    return "Let It Be – The Beatles"; // fallback suggestion
  }
};

module.exports = { recommendSongFromMood };
