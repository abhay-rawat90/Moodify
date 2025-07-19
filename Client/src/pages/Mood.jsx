import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const extractVideoId = (url) => {
  const match = url?.match(/(?:v=|youtu\.be\/)([^&\n?#]+)/);
  return match ? match[1] : null;
};

const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
);
const MoodIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
);

const Mood = () => {
  const { user } = useContext(AuthContext);
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMoods = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/moods`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setMoods(res.data);
    } catch (err) {
      console.error("Failed to fetch moods");
    } finally {
      setLoading(false);
    }
  };

  const deleteMood = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/moods/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setMoods((prev) => prev.filter((mood) => mood._id !== id));
    } catch (err) {
      console.error("Failed to delete mood", err);
    }
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  return (
    <div 
      className="w-full text-white font-sans"
      style={{ minHeight: 'calc(100vh - 72px)' }} // Assumes navbar height is ~72px
    >
      <div className="container w-full mx-auto p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/10 p-8 sm:p-10 animate-fade-in-up">
            
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                Your Saved Moods
              </span>
            </h2>

            {loading ? (
                <div className="flex justify-center items-center gap-3 mt-8">
                    <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-300">Loading your moods...</span>
                </div>
            ) : moods.length === 0 ? (
              <p className="text-center text-gray-400 text-lg">No moods saved yet.</p>
            ) : (
              <ul className="space-y-6">
                {moods.map((mood, index) => (
                  <li
                    key={mood._id}
                    className="bg-gray-800/70 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-700 transition-all duration-300 hover:border-purple-500/50 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms`}}
                  >
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex-grow">
                            <div className="flex items-center gap-2 text-lg font-semibold text-white mb-1">
                                <MoodIcon />
                                <span className="italic">{mood.moodText}</span>
                            </div>
                            <div className="text-xs text-gray-500 mb-4 ml-7">
                                Saved on {new Date(mood.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                        <button
                            onClick={() => deleteMood(mood._id)}
                            className="group flex-shrink-0 bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2 rounded-full transition-all"
                        >
                            <DeleteIcon />
                        </button>
                    </div>

                    {mood.songTitle && (
                      <>
                        <div className="mb-3 text-md font-medium text-gray-300">
                          <span className="text-purple-400">Recommended Song:</span> {mood.songTitle}
                        </div>
                        <div className="aspect-video rounded-xl overflow-hidden border border-gray-600 shadow-inner">
                          <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${extractVideoId(mood.songUrl)}`}
                            title={mood.songTitle}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
  
  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #111827; /* bg-gray-900 */
    font-family: 'Poppins', sans-serif;
  }

  *, *::before, *::after {
    box-sizing: inherit;
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
    opacity: 0; /* Start hidden */
    animation: fade-in 0.5s ease-out forwards;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);


export default Mood;
