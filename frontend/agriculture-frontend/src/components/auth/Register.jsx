import { useState } from "react";
import api from "../../services/api";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email:"",
    mobile: "",
    password: "",
    landSize: "",
    income: "",
    cropType: "",
    category: "",
    state: ""
  });

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/farmers/register", formData);
      setSuccess("Registration successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Farmer Registration
        </Typography>

        {success && <Alert severity="success">{success}</Alert>}

        <form onSubmit={handleSubmit}>

          <TextField fullWidth label="Name" name="name" margin="normal"
            value={formData.name} onChange={handleChange} required />
            <TextField
  fullWidth
  label="Email"
  name="email"
  margin="normal"
  value={formData.email}
  onChange={handleChange}
  required
/>

          <TextField fullWidth label="Mobile" name="mobile" margin="normal"
            value={formData.mobile} onChange={handleChange} required />

          <TextField fullWidth label="Password" name="password"
            type="password" margin="normal"
            value={formData.password} onChange={handleChange} required />

          <TextField fullWidth label="Land Size (in acres)"
            name="landSize" margin="normal"
            value={formData.landSize} onChange={handleChange} required />

          <TextField fullWidth label="Annual Income"
            name="income" margin="normal"
            value={formData.income} onChange={handleChange} required />

          <TextField select fullWidth label="Crop Type"
            name="cropType" margin="normal"
            value={formData.cropType} onChange={handleChange} required>
            <MenuItem value="ALL">ALL</MenuItem>
            <MenuItem value="WHEAT">WHEAT</MenuItem>
            <MenuItem value="RICE">RICE</MenuItem>
          </TextField>

          <TextField fullWidth label="Category"
            name="category" margin="normal"
            value={formData.category} onChange={handleChange} required />

          <TextField fullWidth label="State"
            name="state" margin="normal"
            value={formData.state} onChange={handleChange} required />

          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Register;