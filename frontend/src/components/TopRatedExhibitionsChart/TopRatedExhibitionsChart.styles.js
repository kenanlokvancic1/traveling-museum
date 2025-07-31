import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const TopRatedExhibitionsContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#F6F2EF",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  marginBottom: theme.spacing(4),
}));

export const ChartTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.5rem",
  color: "#3E2723",
  marginBottom: theme.spacing(2),
}));
