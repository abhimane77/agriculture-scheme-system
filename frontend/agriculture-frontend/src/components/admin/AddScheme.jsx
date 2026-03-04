import { useState } from "react";
import api from "../../services/api";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AddScheme() {

  const navigate = useNavigate();

  const [scheme, setScheme] = useState({
    name: "",
    description: "",
    minLandSize: "",
    maxLandSize: "",
    minIncome: "",
    maxIncome: "",
    cropType: "",
    category: "",
    state: ""
  });

  const handleChange = (e) => {
    setScheme({
      ...scheme,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/schemes", scheme);
      navigate("/admin/schemes");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5">Add New Scheme</Typography>

        <form onSubmit={handleSubmit}>

          <TextField
            fullWidth
            label="Scheme Name"
            name="name"
            margin="normal"
            value={scheme.name}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            margin="normal"
            value={scheme.description}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Min Land Size"
            name="minLandSize"
            margin="normal"
            value={scheme.minLandSize}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Max Land Size"
            name="maxLandSize"
            margin="normal"
            value={scheme.maxLandSize}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Min Income"
            name="minIncome"
            margin="normal"
            value={scheme.minIncome}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Max Income"
            name="maxIncome"
            margin="normal"
            value={scheme.maxIncome}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Crop Type"
            name="cropType"
            margin="normal"
            value={scheme.cropType}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Category"
            name="category"
            margin="normal"
            value={scheme.category}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="State"
            name="state"
            margin="normal"
            value={scheme.state}
            onChange={handleChange}
          />

          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
          >
            Add Scheme
          </Button>

        </form>
      </Paper>
    </Container>
  );
}

export default AddScheme;