import { styled } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";

export const Wrapper = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: `linear-gradient(135deg, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[800]} 100%)`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(4),
  textAlign: "center",
  color: theme.palette.common.white,
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: "6rem",
  fontWeight: 700,
  marginBottom: theme.spacing(2),
}));

export const Message = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  marginBottom: theme.spacing(1),
  color: theme.palette.grey[300],
}));

export const SubMessage = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontStyle: "italic",
  color: theme.palette.grey[500],
  marginBottom: theme.spacing(4),
  maxWidth: 600,
}));

export const BackButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  fontSize: "1rem",
  fontWeight: "bold",
  textTransform: "none",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));
