import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";

import axios from "axios";

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const SpotifyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
);
const SaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
);
const SavedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);
const NewMoodIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5"></path><polyline points="17 8 21 12 17 16"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
);



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
      const { title, spotifyTitle } = aiRes.data;

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
        `${import.meta.env.VITE_API_BASE_URL}/spotify/link?title=${encodeURIComponent(spotifyTitle)}`
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
    // This container centers the content vertically in the space *below* the navbar.
    // We use `calc()` to subtract the approximate navbar height from the viewport height.
    <div 
      className="w-full text-white font-sans flex items-center justify-center"
      style={{ minHeight: 'calc(100vh - 72px)' }} // Assumes navbar height is ~72px
    >
      <div className="container w-full mx-auto p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-2xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/10 p-6 sm:p-8 animate-fade-in-up">
            
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                Mood-Based Song Finder
              </span>
            </h2>
            <p className="text-center text-gray-400 mb-8">Tell us how you're feeling... 😌</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                value={moodText}
                onChange={(e) => setMoodText(e.target.value)}
                placeholder="e.g., happy, melancholic, energetic..."
                className="p-4 rounded-xl bg-gray-700/50 border-2 border-gray-600 focus:ring-2 focus:ring-purple-500 focus:outline-none text-base sm:text-lg transition-all duration-300"
              />
              <button
                type="submit"
                disabled={loading}
                className="group flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-wait"
              >
                <SearchIcon />
                {loading ? 'Finding your vibe...' : 'Recommend a Song'}
              </button>
            </form>

            {error && (
              <p className="text-red-400 mt-4 text-center font-medium animate-fade-in">{error}</p>
            )}

            {loading && (
              <div className="flex justify-center items-center gap-3 mt-8 animate-fade-in">
                <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-300">Analyzing your mood...</span>
              </div>
            )}

            {song && !loading && (
              <div className="mt-10 bg-gray-800/70 border border-gray-700 p-4 sm:p-6 rounded-2xl shadow-lg animate-fade-in">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{song.title}</h3>
                
                {song.embedUrl && (
                  <div className="aspect-video rounded-lg overflow-hidden shadow-lg mb-4">
                    <iframe
                      className="w-full h-full"
                      src={song.embedUrl}
                      title={song.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}

                {spotifyData?.spotifyUrl && (
                  <a
                    href={spotifyData.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-2 mt-4 w-full bg-green-600 hover:bg-green-500 text-white font-semibold px-4 py-3 rounded-xl transition-all duration-300"
                  >
                    <SpotifyIcon />
                    Listen on Spotify
                  </a>
                )}

                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <button
                    onClick={handleSave}
                    disabled={saved}
                    className={`group flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all duration-300 ${
                      saved
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-500"
                    }`}
                  >
                    {saved ? <SavedIcon /> : <SaveIcon />}
                    {saved ? "Saved" : "Save"}
                  </button>
                  <button
                    onClick={handleNewMood}
                    className="group flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-700 text-white font-semibold border border-gray-600 hover:bg-gray-600 transition-all duration-300"
                  >
                    <NewMoodIcon />
                    New Mood
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
  
  body {
    font-family: 'Poppins', sans-serif;
    background-color: #111827; /* bg-gray-900 */
    margin: 0; /* Ensures no default body margin interferes with layout */
  }

  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
  }
  
  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Home;
