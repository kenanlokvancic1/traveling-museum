import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const ExhibitionInsightsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: "#f5f5f5",
  borderRadius: theme.spacing(2),
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
}));

export const ExhibitionInsightsTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "1.8rem",
  marginBottom: theme.spacing(3),
}));

export const ExhibitionGraphContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const ExhibitionGraphTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
  marginBottom: theme.spacing(2),
}));
