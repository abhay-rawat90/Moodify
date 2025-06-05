import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const extractVideoId = (url) => {
  const match = url?.match(/(?:v=|youtu\.be\/)([^&\n?#]+)/);
  return match ? match[1] : null;
};

const Mood = () => {
  const { user } = useContext(AuthContext);
  const [moods, setMoods] = useState([]);

  const fetchMoods = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/moods", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setMoods(res.data);
    } catch (err) {
      console.error("Failed to fetch moods");
    }
  };

  const deleteMood = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/moods/${id}`, {
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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8 transition-all duration-300">
        <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-8 tracking-tight">
          🧠 Your Saved Moods
        </h2>

        {moods.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No moods saved yet.</p>
        ) : (
          <ul className="space-y-6">
            {moods.map((mood) => (
              <li
                key={mood._id}
                className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition-all relative"
              >
                <button
                  onClick={() => deleteMood(mood._id)}
                  className="absolute top-4 right-4 bg-red-100 hover:bg-red-200 text-red-700 text-sm px-3 py-1 rounded-full font-semibold transition"
                >
                  🗑️ Delete
                </button>

                <div className="text-lg font-semibold text-gray-800 mb-1">
                  Mood:{" "}
                  <span className="italic font-medium text-blue-700">{mood.moodText}</span>
                </div>

                <div className="text-sm text-gray-500 mb-4">
                  {new Date(mood.createdAt).toLocaleString()}
                </div>

                {mood.songTitle && (
                  <>
                    <div className="mb-2 text-md font-medium text-gray-700">
                      🎵 Recommended Song:{" "}
                      <span className="text-indigo-600">{mood.songTitle}</span>
                    </div>
                    <div className="aspect-video rounded-xl overflow-hidden border border-gray-300 shadow-inner">
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
  );
};

export default Mood;
