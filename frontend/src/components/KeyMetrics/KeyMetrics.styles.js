import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const KeyMetricsContainer = styled(Box)(({ theme }) => ({
  background: "#C7BFAB",
  padding: theme.spacing(6, 2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const KeyMetricsTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "2rem",
  marginBottom: theme.spacing(4),
  color: "#3E2723",
}));

export const KeyMetricsCardWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: theme.spacing(4),
}));
