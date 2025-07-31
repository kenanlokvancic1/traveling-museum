import { styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";

export const MetricCardContainer = styled(Card)(({ theme }) => ({
  background: "linear-gradient(145deg, #5E493A, #7C6653)", 
  borderRadius: theme.spacing(2),
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
  padding: theme.spacing(4),
  minWidth: 220,
  textAlign: "center",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: "0 10px 28px rgba(0, 0, 0, 0.3)",
  },
}));

export const MetricCardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "1.2rem",
  color: "#E9E3D6",
  marginBottom: theme.spacing(1.5),
}));

export const MetricCardValue = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: 700,
  color: "#F5F3ED",
  textShadow: "2px 2px 8px rgba(0, 0, 0, 0.4)",
}));
