import { Drawer, List, ListItemButton, ListItemText, Toolbar, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 220;

function FarmerLayout({ children }) {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box"
          }
        }}
      >

        <Toolbar />

        <List>

          <ListItemButton onClick={() => navigate("/farmer/dashboard")}>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/farmer/schemes")}>
            <ListItemText primary="Schemes" />
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/farmer/notifications")}>
            <ListItemText primary="Notifications" />
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/farmer/applications")}>
            <ListItemText primary="My Applications" />
          </ListItemButton>

          <ListItemButton onClick={() => navigate("/farmer/profile")}>
            <ListItemText primary="Profile" />
          </ListItemButton>

          <ListItemButton onClick={logout}>
            <ListItemText primary="Logout" />
          </ListItemButton>

        </List>

      </Drawer>

      {/* Page Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>

    </Box>
  );
}

export default FarmerLayout;