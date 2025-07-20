import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Mood from "./pages/Mood";
import Navbar from "./components/navbar";
import Profile from "./pages/Profile";
import Beams from "./blocks/Backgrounds/Beams/Beams";




function App() {

  return (
    <>
    <Router>
        {/* The Beams background is now here, covering the entire viewport */}
        <div className="fixed inset-0 z-0">
           <Beams
            beamWidth={3}
            beamHeight={30}
            beamNumber={20}
            lightColor="#F231E2" 
            speed={3.8}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={30}
          />
        </div>
        
        {/* The Navbar floats on top of the background */}
        <Navbar />

        {/* The main content area has top padding to avoid the navbar */}
        <main className="relative z-10 pt-24">
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mood" element={<ProtectedRoute><Mood /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
