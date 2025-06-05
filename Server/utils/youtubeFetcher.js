const yts = require("yt-search");

const fetchYoutubeLink = async (songQuery) => {
  try {
    const result = await yts(songQuery);
    const video = result.videos[0];
    return {
      title: video.title,
      url: video.url,
      thumbnail: video.thumbnail,
    };
  } catch (err) {
    console.error("YouTube Fetch Error:", err.message);
    return null;
  }
};

module.exports = { fetchYoutubeLink };
