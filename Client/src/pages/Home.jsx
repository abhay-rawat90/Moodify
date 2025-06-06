import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [moodText, setMoodText] = useState("");
  const [song, setSong] = useState(null);
  const [spotifyData, setSpotifyData] = useState(null); // ⬅️ NEW
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [submittedMood, setSubmittedMood] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!moodText.trim()) return;

    try {
      setError("");
      setSong(null);
      setSaved(false);
      setSpotifyData(null); // ⬅️ RESET
      setSubmittedMood(moodText);
      setLoading(true);

      const aiRes = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/ai-song`, { moodText });
      const { title } = aiRes.data;

      const ytRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/youtube/search`, {
        params: { songTitle: title },
      });

      const songData = {
        title: ytRes.data.title,
        url: ytRes.data.link,
        embedUrl: ytRes.data.embedUrl,
      };

      setSong(songData);

      // 🔗 Get Spotify Link
      const spotifyRes = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/spotify/link?title=${encodeURIComponent(title)}`
      );

      if (spotifyRes.data?.spotifyUrl) {
        setSpotifyData(spotifyRes.data);
      }

    } catch (err) {
      console.error("Error:", err);
      setError("Failed to get a valid song. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/moods`,
        {
          moodText: submittedMood,
          songTitle: song.title,
          songUrl: song.url,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSaved(true);
    } catch (err) {
      console.error("Error saving song", err);
    }
  };

  const handleNewMood = () => {
    setMoodText("");
    setSong(null);
    setSaved(false);
    setSpotifyData(null);
    setSubmittedMood("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 transition-all duration-300">
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-8 tracking-tight">
          🎶 Mood-Based Song Finder
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            value={moodText}
            onChange={(e) => setMoodText(e.target.value)}
            placeholder="Tell us how you're feeling... 😌"
            className="p-4 rounded-xl border-2 border-indigo-300 focus:ring-4 focus:ring-indigo-200 focus:outline-none text-lg transition"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-xl shadow hover:opacity-90 hover:scale-[1.01] active:scale-100 transition"
          >
            🔍 Recommend a Song
          </button>
        </form>

        {error && (
          <p className="text-red-600 mt-4 text-center font-medium">{error}</p>
        )}

        {loading && (
          <div className="flex justify-center mt-8">
            <div className="w-10 h-10 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {song && !loading && (
          <div className="mt-10 bg-indigo-50 border border-indigo-200 p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold text-indigo-800 mb-3">{song.title}</h3>
            
            {song.embedUrl ? (
              <iframe
                className="w-full aspect-video rounded-lg shadow"
                src={song.embedUrl}
                title={song.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <p className="text-gray-600">No embeddable video found.</p>
            )}

            {spotifyData?.spotifyUrl && (
              <a
                href={spotifyData.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-xl transition"
              >
                🎧 Listen on Spotify
              </a>
            )}

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSave}
                disabled={saved}
                className={`flex-1 py-3 rounded-xl font-bold transition ${
                  saved
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700 hover:scale-[1.01]"
                }`}
              >
                {saved ? "✅ Saved" : "💾 Save"}
              </button>
              <button
                onClick={handleNewMood}
                className="flex-1 py-3 rounded-xl bg-white text-gray-800 font-semibold border border-gray-400 hover:bg-gray-100 transition"
              >
                🔄 New Mood
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
