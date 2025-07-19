import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;
const MoodsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M9 15.5l1.5 1.5 3-3"></path></svg>;
const ProfileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const LoginIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>;
const RegisterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="17" y1="11" x2="23" y2="11"></line></svg>;
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login"); // Assuming you have a login route
  };

  const navLinkClass = "flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300";
  const mobileNavLinkClass = "flex items-center gap-3 text-lg text-gray-200 hover:bg-gray-700/50 p-3 rounded-lg transition-colors duration-300";

  return (
    <header className="relative bg-gray-900/60 backdrop-blur-xl sticky top-0 z-50 animate-fade-in overflow-hidden border-b border-white/10">
      {/* Updated background with a second animated layer */}
      <div className="liquid-glass-effect"></div>
      <div className="liquid-glass-effect-2"></div>
      
      <nav className="container relative z-10 mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Updated Brand/Logo on the left */}
          <Link to="/" className="text-3xl tracking-wide" onClick={() => setIsOpen(false)}>
             <span className="font-logo animate-text-gradient bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                Moodify
             </span>
          </Link>

          {/* Desktop Menu on the right */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <Link to="/mood" className={navLinkClass}><MoodsIcon /><span>Saved Moods</span></Link>
                <Link to="/profile" className={navLinkClass}><ProfileIcon /><span>Profile</span></Link>
                <button onClick={handleLogout} className={`${navLinkClass} text-pink-400 hover:text-pink-300`}><LogoutIcon /><span>Logout</span></button>
              </>
            ) : (
              <>
                <Link to="/login" className={navLinkClass}><LoginIcon /><span>Login</span></Link>
                <Link to="/register" className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300">
                  <RegisterIcon />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden mt-4 animate-fade-in-up">
            <div className="flex flex-col gap-2">
               {user ? (
                <>
                  <Link to="/mood" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}><MoodsIcon /><span>Saved Moods</span></Link>
                  <Link to="/profile" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}><ProfileIcon /><span>Profile</span></Link>
                  <hr className="border-gray-700 my-2" />
                  <button onClick={handleLogout} className={`${mobileNavLinkClass} text-pink-400 w-full`}><LogoutIcon /><span>Logout</span></button>
                </>
              ) : (
                <>
                  <Link to="/login" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}><LoginIcon /><span>Login</span></Link>
                  <Link to="/register" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}><RegisterIcon /><span>Register</span></Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');

  .font-logo {
    font-family: 'Righteous', cursive;
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }
  .animate-fade-in-up {
    animation: fade-in-up 0.3s ease-out forwards;
  }

  /* Liquid Glass Effect Animation */
  @keyframes liquid-flow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .liquid-glass-effect {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      120deg,
      rgba(192, 132, 252, 0) 20%,
      rgba(236, 72, 153, 0.15) 50%,
      rgba(99, 102, 241, 0) 80%
    );
    background-size: 300% 300%;
    animation: liquid-flow 12s ease infinite;
    z-index: 0;
    pointer-events: none;
    opacity: 0.8;
  }
  
  .liquid-glass-effect-2 {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      -120deg,
      rgba(99, 102, 241, 0) 30%,
      rgba(192, 132, 252, 0.2) 60%,
      rgba(236, 72, 153, 0) 90%
    );
    background-size: 400% 400%;
    animation: liquid-flow 18s ease-in-out infinite reverse;
    z-index: 0;
    pointer-events: none;
    opacity: 0.6;
  }

  /* New Shifting Gradient Logo Animation */
  @keyframes text-gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .animate-text-gradient {
    background-size: 200% 200%;
    animation: text-gradient-shift 5s ease-in-out infinite;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Navbar;
