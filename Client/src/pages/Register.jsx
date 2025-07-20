import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const UserIcon = () => (
    <svg className="pointer-events-none absolute left-3 top-4 -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
const EmailIcon = () => (
  <svg className="pointer-events-none absolute left-3 top-4 -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);
const PasswordIcon = () => (
  <svg className="pointer-events-none absolute left-3 top-4 -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);
const RegisterActionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="17" y1="11" x2="23" y2="11"></line></svg>
);

const Register = () => {
  const [inputs, setInputs] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, inputs);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div 
      className="w-full text-white font-sans flex items-center justify-center"
      style={{ minHeight: 'calc(100vh - 96px)' }} // Assumes navbar height is ~72px
    >
      <div className="container w-full mx-auto p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/10 p-8 sm:p-10 animate-fade-in-up">
            
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                Create Account
              </span>
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative">
                <UserIcon />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  className="w-full p-3 pl-10 rounded-xl bg-gray-700/50 border-2 border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 focus:outline-none text-lg transition-all duration-300"
                  required
                />
              </div>
              <div className="relative">
                <EmailIcon />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className="w-full p-3 pl-10 rounded-xl bg-gray-700/50 border-2 border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 focus:outline-none text-lg transition-all duration-300"
                  required
                />
              </div>
              <div className="relative">
                <PasswordIcon />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="w-full p-3 pl-10 rounded-xl bg-gray-700/50 border-2 border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 focus:outline-none text-lg transition-all duration-300"
                  required
                />
              </div>

              {error && <p className="text-red-400 text-sm text-center animate-fade-in">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="group flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-purple-500/40 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-wait"
              >
                <RegisterActionIcon />
                {loading ? 'Creating Account...' : 'Register'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-400 font-medium hover:underline"
              >
                Login here
              </Link>
            </p>
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

  /* A more specific reset for good measure */
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
    animation: fade-in 0.5s ease-out forwards;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
export default Register;

