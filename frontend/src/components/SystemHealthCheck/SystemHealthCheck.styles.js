import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const SystemHealthCheckContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: "#f5f5f5",
  borderRadius: theme.spacing(2),
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
}));

export const SystemHealthTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "1.8rem",
  marginBottom: theme.spacing(3),
}));

export const StatusContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
}));
