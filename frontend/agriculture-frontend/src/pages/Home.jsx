import { Container, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* HERO SECTION */}
      <div style={{ background: "#f4f9f4", padding: "80px 0" }}>
        <Container maxWidth="md" style={{ textAlign: "center" }}>
          <Typography variant="h3" gutterBottom>
            Agriculture Scheme Recommendation System 🌾
          </Typography>

          <Typography variant="h6" color="textSecondary" paragraph>
            Helping farmers discover government schemes based on eligibility.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/login")}
          >
            Get Started
          </Button>
        </Container>
      </div>

      {/* FEATURES SECTION */}
      <Container sx={{ mt: 8, mb: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Features
        </Typography>

        <Grid container spacing={4} sx={{ mt: 4 }}>

          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">
                  🎯 Smart Scheme Recommendation
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Personalized scheme suggestions based on farmer profile.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">
                  🔐 Secure Authentication
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  JWT-based login with role-based access control.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">
                  📊 Admin Dashboard
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Manage schemes and monitor farmers efficiently.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </Container>

      {/* CTA SECTION */}
      <div style={{ background: "#e8f5e9", padding: "60px 0" }}>
        <Container maxWidth="md" style={{ textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Ready to explore government schemes?
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/login")}
          >
            Login Now
          </Button>
        </Container>
      </div>
    </>
  );
}

export default Home;