import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Mood from "./pages/Mood";
import Navbar from "./components/navbar";
import Profile from "./pages/Profile";




function App() {

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path = "/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path = "/mood" element={<ProtectedRoute><Mood /></ProtectedRoute>} />
        <Route path = "/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
