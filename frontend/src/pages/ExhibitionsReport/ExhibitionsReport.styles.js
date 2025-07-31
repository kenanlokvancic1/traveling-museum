import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const ReportContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#f9f9f9",
  minHeight: "100vh",
}));

export const ReportTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontWeight: "bold",
  color: theme.palette.text.primary,
}));
