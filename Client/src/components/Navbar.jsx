import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-800 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <Link
        to="/"
        className="text-2xl font-extrabold tracking-wide text-white hover:text-indigo-200 transition"
      >
        🎧 Moodify
      </Link>

      <div className="flex gap-6 items-center text-sm font-medium tracking-wide">
        {!user ? (
          <>
            <Link
              to="/login"
              className="hover:text-indigo-300 transition duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hover:text-indigo-300 transition duration-200"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/mood"
              className="hover:text-indigo-300 transition duration-200"
            >
              Saved Moods
            </Link>
            <Link
              to="/profile"
              className="hover:text-indigo-300 transition duration-200"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full shadow-sm transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
