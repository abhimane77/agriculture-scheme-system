import { useEffect, useState } from "react";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function EditScheme() {

  const { id } = useParams();
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

  useEffect(() => {
    fetchScheme();
  }, []);

  const fetchScheme = async () => {
    try {
      const res = await api.get(`/schemes`);
      const selected = res.data.find(s => s.id === id);
      setScheme(selected);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setScheme({
      ...scheme,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/schemes/${id}`, scheme);
      navigate("/admin/schemes");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5">Edit Scheme</Typography>

        <form onSubmit={handleSubmit}>

          <TextField
            fullWidth
            label="Scheme Name"
            name="name"
            value={scheme.name}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={scheme.description}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Min Land Size"
            name="minLandSize"
            value={scheme.minLandSize}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Max Land Size"
            name="maxLandSize"
            value={scheme.maxLandSize}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Min Income"
            name="minIncome"
            value={scheme.minIncome}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Max Income"
            name="maxIncome"
            value={scheme.maxIncome}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Crop Type"
            name="cropType"
            value={scheme.cropType}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Category"
            name="category"
            value={scheme.category}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="State"
            name="state"
            value={scheme.state}
            onChange={handleChange}
            margin="normal"
          />

          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
          >
            Update Scheme
          </Button>

        </form>
      </Paper>
    </Container>
  );
}

export default EditScheme;