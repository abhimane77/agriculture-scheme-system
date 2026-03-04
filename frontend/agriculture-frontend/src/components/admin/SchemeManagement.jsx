import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function SchemeManagement() {

  const [schemes, setSchemes] = useState([]);
  const navigate = useNavigate();

  const fetchSchemes = async () => {
    try {
      const res = await api.get("/schemes");
      setSchemes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, []);

  const toggleStatus = async (id) => {
    try {
      await api.put(`/schemes/toggle/${id}`);
      fetchSchemes();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteScheme = async (id) => {
    try {
      await api.delete(`/schemes/${id}`);
      fetchSchemes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Scheme Management
      </Typography>

      <Paper sx={{ mt: 3 }}>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Toggle</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {schemes.map((scheme) => (
              <TableRow key={scheme.id}>
                <TableCell>{scheme.name}</TableCell>
                <TableCell>{scheme.description}</TableCell>

                <TableCell>
                  {scheme.active ? "Active" : "Inactive"}
                </TableCell>

                {/* Edit Button */}
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/admin/edit-scheme/${scheme.id}`)}
                  >
                    Edit
                  </Button>
                </TableCell>

                {/* Toggle Button */}
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => toggleStatus(scheme.id)}
                  >
                    Toggle
                  </Button>
                </TableCell>

                {/* Delete Button */}
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteScheme(scheme.id)}
                  >
                    Delete
                  </Button>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>

        </Table>
      </Paper>
    </Container>
  );
}

export default SchemeManagement;