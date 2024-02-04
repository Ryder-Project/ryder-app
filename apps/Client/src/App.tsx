import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage";
import RequestRiderPage from "./pages/riderForm/RequestRiderPage";
import RiderSignUpPage from "./pages/Auth/Rider/SignUp";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import CheckEmail from "./components/auth/resetPassword/CheckEmail";
import ForgotPassword from "./components/auth/resetPassword/ForgotPassword";
import VerifyMail from "./components/auth/resetPassword/VerifyMailModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RiderProfileSettings from "./pages/RiderProfileSettings";

import LoginPage from "./pages/Login/LoginPage";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/request-rider" element={<RequestRiderPage />} />
          <Route path="/signup/rider" element={<RiderSignUpPage />} />
          <Route path="/verify-email" element={<VerifyMail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/check-email" element={<CheckEmail />} />
          <Route path="/riderprofilesettings" element={<RiderProfileSettings />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      </Router>
    </>
  );
}

export default App;
