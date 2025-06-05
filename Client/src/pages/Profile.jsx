import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  console.log(user.user.username);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 transition-all duration-300">
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-8 tracking-tight">
          👤 Your Profile
        </h2>

        <div className="space-y-5 text-lg text-gray-800 font-medium">
          <div className="flex items-center justify-between">
            <span className="text-indigo-600">Username:</span>
            <span>{user.user.username}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-indigo-600">Email:</span>
            <span>{user.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

