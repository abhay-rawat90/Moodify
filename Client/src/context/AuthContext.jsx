import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("moodUser")) || null
  );

  const login = (data) => {
    localStorage.setItem("moodUser", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("moodUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
