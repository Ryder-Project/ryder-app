import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage";
import RequestRiderPage from "./pages/RequestRiderPage";
import RiderSignUpPage from "./pages/Auth/Rider/SignUp";
 import RiderProfileSettings from "./pages/RiderProfileSettings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/request-rider" element={<RequestRiderPage />} />
        <Route path="/signup/rider" element={<RiderSignUpPage />} />
        <Route path="/userprofilesettings" element={<RiderProfileSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
