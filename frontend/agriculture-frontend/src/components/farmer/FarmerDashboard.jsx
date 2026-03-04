import { useEffect, useState } from "react";
import api from "../../services/api";
import FarmerLayout from "./FarmerLayout";

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

  const farmerName = localStorage.getItem("farmerName");

  useEffect(() => {
    api.get("/schemes/active")
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

    <FarmerLayout>

      <Container sx={{ mt: 2 }}>

        <Typography variant="h4" gutterBottom>
          Welcome, {farmerName} 🌾
        </Typography>

        <Typography variant="h6" sx={{ mt: 3 }}>
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

    </FarmerLayout>
  );
}

export default FarmerDashboard;