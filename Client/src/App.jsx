import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Beams from "./blocks/Backgrounds/Beams/Beams";

const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Mood = lazy(() => import("./pages/Mood"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  return (
    <Router>
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
        
        <Navbar />

        <main className="relative z-10 pt-24">
          <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
            <Routes>
              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/mood" element={<ProtectedRoute><Mood /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Routes>
          </Suspense>
        </main>
      </Router>
  )
}
export default App;