import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";   // ✅ ADD THIS

import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import Login from "./components/auth/Login";
import FarmerDashboard from "./components/farmer/FarmerDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import api from "./services/api";
import Register from "./components/auth/Register";
import FarmerApproval from "./components/admin/FarmerApproval";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api.get("/hello")
      .then(res => setMsg(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <BrowserRouter>
      <Navbar />

      {/* ✅ optional: show backend connection message */}
      <p style={{ textAlign: "center", color: "green" }}>
        {msg}
      </p>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route
  path="/admin/farmers"
  element={
    <ProtectedRoute role="ADMIN">
      <FarmerApproval />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;