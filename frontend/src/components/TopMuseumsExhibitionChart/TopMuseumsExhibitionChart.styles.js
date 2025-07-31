import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const ChartWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "#F5F5F5",
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  marginBottom: theme.spacing(4),
  marginTop: theme.spacing(4),
}));

export const ChartTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "1.6rem",
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(4),
}));
