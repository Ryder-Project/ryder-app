import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage";
import RequestRiderPage from "./pages/riderForm/RequestRiderPage";
import RiderSignUpPage from "./pages/Auth/Rider/SignUp";
import ResetPasswordPage from "./pages/Auth/ResetPasswordPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RiderProfileSettings from "./pages/RiderProfileSettings";
import LoginPage from "./pages/Login/LoginPage";
import CustomerSignupPage from "./pages/Auth/Customer/SignupPage";

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
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/riderprofilesettings"
            element={<RiderProfileSettings />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup/customer" element={<CustomerSignupPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
