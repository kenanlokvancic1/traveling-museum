import { styled } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";

export const Background = styled(Box)({
  minHeight: "100vh",
  backgroundImage: "url('https://images.unsplash.com/photo-1601597111105-79a1b017b18d?auto=format&fit=crop&w=1920&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
});

export const Wrapper = styled(Box)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.85)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  padding: theme.spacing(6),
  maxWidth: 600,
  width: "100%",
  textAlign: "center",
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[8],
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: "3.5rem",
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  color: theme.palette.error.main,
}));

export const Message = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  marginBottom: theme.spacing(1),
}));

export const SubMessage = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontStyle: "italic",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(4),
}));

export const BackButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  fontSize: "1rem",
  fontWeight: "bold",
  textTransform: "none",
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: theme.palette.error.dark,
  },
}));
