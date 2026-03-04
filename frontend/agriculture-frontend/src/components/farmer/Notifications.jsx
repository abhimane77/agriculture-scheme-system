import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip
} from "@mui/material";

import FarmerLayout from "./FarmerLayout";

function Notifications() {

  const [notifications, setNotifications] = useState([]);

  const farmerId = localStorage.getItem("farmerId");

  const fetchNotifications = async () => {
    try {

      const res = await api.get(`/farmers/notifications/${farmerId}`);

      setNotifications(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {

    try {

      await api.put(`/farmers/notifications/read/${id}`);

      fetchNotifications();

    } catch (err) {
      console.error(err);
    }

  };

  return (

    <FarmerLayout>

      <Typography variant="h4" gutterBottom>
        Notifications 🔔
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>

        {notifications.length === 0 && (
          <Typography>No notifications</Typography>
        )}

        {notifications.map((n) => (

          <Grid item xs={12} key={n.id}>

            <Card elevation={3}>

              <CardContent>

                <Typography>
                  {n.message}
                </Typography>

                <Chip
                  label={n.read ? "Read" : "Unread"}
                  color={n.read ? "success" : "warning"}
                  sx={{ mt: 2 }}
                />

                {!n.read && (

                  <Button
                    variant="contained"
                    size="small"
                    sx={{ ml: 2 }}
                    onClick={() => markAsRead(n.id)}
                  >
                    Mark as Read
                  </Button>

                )}

              </CardContent>

            </Card>

          </Grid>

        ))}

      </Grid>

    </FarmerLayout>

  );
}

export default Notifications;