import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const TimelineWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "#F5F5F5",
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  marginBottom: theme.spacing(4),
}));

export const TimelineContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#fafafa",
  borderRadius: theme.spacing(2),
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  marginBottom: theme.spacing(4),
}));

export const TimelineTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "1.6rem",
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
}));

export const TimelineDate = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem",
  color: theme.palette.text.secondary,
}));
