import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage";
import RequestRiderPage from "./pages/riderForm/RequestRiderPage";
import ResetPasswordPage from "./pages/Auth/ResetPasswordPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RiderProfileSettings from "./pages/RiderProfileSettings";

import LoginPage from "./pages/Auth/Login/LoginPage";
import CustomerSignupPage from "./pages/Auth/Customer/SignupPage";
import VerifyMail from "./components/Auth/resetPassword/VerifyMail";
import RiderSignupPage from "./components/Auth/Rider/Signup";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/request-rider" element={<RequestRiderPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/riderprofilesettings"
            element={<RiderProfileSettings />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup/customer" element={<CustomerSignupPage />} />
          <Route path="/verify-email" element={<VerifyMail />} />
          <Route path="/signup/rider" element={<RiderSignupPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
