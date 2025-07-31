import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const OverviewContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: "#FAFAFA",
  borderRadius: theme.spacing(2),
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  marginBottom: theme.spacing(4),
  marginTop: theme.spacing(4),

}));

export const OverviewTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "1.6rem",
  marginBottom: theme.spacing(3),
  color: "#3E2723",
}));
