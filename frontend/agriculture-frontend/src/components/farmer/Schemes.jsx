import { useEffect, useState } from "react";
import api from "../../services/api";
import FarmerLayout from "./FarmerLayout";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Button
} from "@mui/material";

function Schemes() {

  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  const farmerId = localStorage.getItem("farmerId");

  useEffect(() => {

    api.get(`/farmers/recommendations/${farmerId}`)
      .then(res => {
        setSchemes(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

  }, [farmerId]);

  return (
    <FarmerLayout>

      <Typography variant="h4" gutterBottom>
        Recommended Schemes ⭐
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

    </FarmerLayout>
  );
}

export default Schemes;