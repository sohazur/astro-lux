import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Booking from "./pages/Booking";
import Destinations from "./pages/Destinations";
import Packages from "./pages/Packages";
import Accommodations from "./pages/Accommodations";
import NotFound from "./pages/NotFound";
import "./index.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/accommodations" element={<Accommodations />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer
            style={{
              textAlign: "center",
              padding: "2rem",
              marginTop: "2rem",
              borderTop: "1px solid rgba(30, 136, 229, 0.3)",
              backgroundColor: "rgba(3, 11, 23, 0.85)",
            }}
          >
            <p>© {new Date().getFullYear()} AstroLux. All rights reserved.</p>
            <p>
              The premier luxury space travel experience from Earth to the
              cosmos.
            </p>
          </footer>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
