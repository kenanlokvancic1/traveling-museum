import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const AdminDashboardContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#F8F8F8",
  padding: theme.spacing(4),
  minHeight: "100vh",
  marginTop: "90px",
}));

export const DashboardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "1.5rem",
  color: "#3E2723",
  marginBottom: theme.spacing(4),
}));

export const DashboardContent = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: theme.spacing(3),
  marginTop: theme.spacing(4),
  "& > *": {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));
