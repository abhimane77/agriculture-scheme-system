import { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AdminDashboard() {
  const navigate = useNavigate();

  const [farmersCount, setFarmersCount] = useState(0);
  const [schemesCount, setSchemesCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  // ✅ MOVE THIS ABOVE useEffect
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
      <Typography variant="h4" gutterBottom>
        Admin Dashboard 🛠️
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6">Total Farmers</Typography>
              <Typography variant="h4" sx={{ mt: 2 }}>
                {farmersCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6">Total Schemes</Typography>
              <Typography variant="h4" sx={{ mt: 2 }}>
                {schemesCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6">Pending Approvals</Typography>
              <Typography variant="h4" sx={{ mt: 2 }}>
                {pendingCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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
      </Grid>
    </Container>
  );
}

export default AdminDashboard;