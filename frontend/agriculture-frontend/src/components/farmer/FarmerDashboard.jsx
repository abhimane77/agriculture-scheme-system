import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Button
} from "@mui/material";

function FarmerDashboard() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/schemes/active") // 🔥 using active schemes
      .then(res => {
        setSchemes(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Farmer Dashboard 🌾
      </Typography>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Active Government Schemes
      </Typography>

      {loading ? (
        <CircularProgress sx={{ mt: 4 }} />
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {schemes.map((scheme) => (
            <Grid item xs={12} md={4} key={scheme.id}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6">
                    {scheme.name}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 2 }}>
                    {scheme.description}
                  </Typography>

                  <Button
                    variant="contained"
                    size="small"
                    sx={{ mt: 2 }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default FarmerDashboard;