import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProfileDetailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
const EmailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

const Profile = () => {
  const { user } = useContext(AuthContext);
  console.log(user.user);

  if (!user || !user.user) {
    return (
        <div className="w-full text-white font-sans flex items-center justify-center" style={{ minHeight: 'calc(100vh - 72px)' }}>
            <p>Loading profile...</p>
        </div>
    );
  }

  return (
    <div 
      className="w-full text-white font-sans flex items-center justify-center"
      style={{ minHeight: 'calc(100vh - 72px)' }} // Assumes navbar height is ~72px
    >
      <div className="container w-full mx-auto p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/10 p-8 sm:p-10 animate-fade-in-up">
            
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                Your Profile
              </span>
            </h2>

            <div className="space-y-6 text-lg">
              <div className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-xl">
                <ProfileDetailIcon />
                <div>
                    <span className="text-sm text-gray-400">Username</span>
                    <p className="font-semibold text-white">{user.user.username}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-xl">
                <EmailIcon />
                <div>
                    <span className="text-sm text-gray-400">Email</span>
                    <p className="font-semibold text-white">{user.user.email}</p>
                </div>
              </div>
            </div>

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

  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);


export default Profile;

