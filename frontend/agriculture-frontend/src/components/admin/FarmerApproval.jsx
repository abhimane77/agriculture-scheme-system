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

function FarmerApproval() {

  const [farmers, setFarmers] = useState([]);

  const fetchFarmers = async () => {
    try {
      const res = await api.get("/admin/farmers");
      setFarmers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  const handleApprove = async (farmerId) => {
    try {
      await api.put(`/admin/verify/${farmerId}`);
      fetchFarmers(); // refresh after approval
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Farmer Approval Panel
      </Typography>

      <Paper sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {farmers.map((farmer) => (
              <TableRow key={farmer.id}>
                <TableCell>{farmer.name}</TableCell>
                <TableCell>{farmer.mobile}</TableCell>
                <TableCell>{farmer.email}</TableCell>
                <TableCell>
                  {farmer.verified ? "Verified" : "Pending"}
                </TableCell>
                <TableCell>
                  {!farmer.verified && (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleApprove(farmer.id)}
                    >
                      Approve
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

export default FarmerApproval;