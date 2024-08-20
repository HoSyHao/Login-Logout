import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Home from "./Components/Home";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import Dashboard from "./Components/Dashboard";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/home" element={<PrivateRoute element={Home} />} />
        <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
