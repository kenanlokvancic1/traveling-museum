import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const ChartContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#EAE0D5",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  marginBottom: theme.spacing(4),
}));

export const ChartTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "1.5rem",
  color: "#3E2723",
  marginBottom: theme.spacing(2),
}));

export const ChartWrapper = styled(Box)(() => ({
  width: "100%",
  height: 300,
}));
