import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Alert,
  MenuItem
} from "@mui/material";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("FARMER");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      let res;

      if (role === "FARMER") {
        res = await api.post("/farmers/login", {
          mobile,
          password,
        });
      } else {
        res = await api.post("/admin/login", {
          email,
          password,
        });
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("farmerId", res.data.farmerId);
      localStorage.setItem("farmerName", res.data.name);

      if (res.data.role === "ROLE_ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/farmer/dashboard");
      }

    } catch {
      setErrorMsg("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={5} sx={{ padding: 4, marginTop: 10 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Agriculture Scheme System
        </Typography>

        <Typography variant="h6" align="center" gutterBottom>
          Login
        </Typography>

        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMsg}
          </Alert>
        )}

        <Box component="form" onSubmit={handleLogin}>

          {/* Role Selector */}
          <TextField
            select
            fullWidth
            label="Login As"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            margin="normal"
          >
            <MenuItem value="FARMER">Farmer</MenuItem>
            <MenuItem value="ADMIN">Admin</MenuItem>
          </TextField>

          {/* Conditional Input */}
          {role === "FARMER" ? (
            <TextField
              fullWidth
              label="Mobile Number"
              margin="normal"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          ) : (
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}

          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </Box>

        {/* ✅ Register only for Farmer */}
        {role === "FARMER" && (
          <Typography align="center" sx={{ mt: 3 }}>
            Don't have an account?{" "}
            <span
              style={{ color: "#1976d2", cursor: "pointer", fontWeight: "bold" }}
              onClick={() => navigate("/register")}
            >
              Register here
            </span>
          </Typography>
        )}
      </Paper>
    </Container>
  );
}

export default Login;