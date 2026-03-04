import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

function AdminDashboard() {

  const navigate = useNavigate();

  const [farmersCount, setFarmersCount] = useState(0);
  const [schemesCount, setSchemesCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  const fetchData = async () => {
    try {

      const farmersRes = await api.get("/admin/farmers");
      setFarmersCount(farmersRes.data.length);

      const schemesRes = await api.get("/schemes");
      setSchemesCount(schemesRes.data.length);

      const pendingRes = await api.get("/admin/pending-farmers");
      setPendingCount(pendingRes.data.length);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>

      <Typography variant="h4" sx={{ mb: 3 }}>
        Admin Dashboard
      </Typography>

      {/* Dashboard Cards */}
      <Grid container spacing={3}>

        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "#1976d2", color: "white" }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <PeopleIcon sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h6">Total Farmers</Typography>
                  <Typography variant="h4">{farmersCount}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "#2e7d32", color: "white" }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <DescriptionIcon sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h6">Total Schemes</Typography>
                  <Typography variant="h4">{schemesCount}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "#ed6c02", color: "white" }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <PendingActionsIcon sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h6">Pending Approvals</Typography>
                  <Typography variant="h4">{pendingCount}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      {/* Quick Actions */}
      <Typography variant="h5" sx={{ mt: 5 }}>
        Quick Actions
      </Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>

        <Grid item>
          <Button
            variant="contained"
            onClick={() => navigate("/admin/add-scheme")}
          >
            Add New Scheme
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="outlined"
            onClick={() => navigate("/admin/farmers")}
          >
            View Farmers
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/admin/schemes")}
          >
            Manage Schemes
          </Button>
        </Grid>

      </Grid>

    </Container>
  );
}

export default AdminDashboard;