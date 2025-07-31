import {
  Card,
  CardContent,
  Box,
  TextField,
  Typography,
  Button,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

export const LoginCard = styled(Card)(({ theme }) => ({
  display: "flex",
  width: "500px",
  maxWidth: "90vw",
  borderRadius: 0,
  overflow: "hidden",
  boxShadow: theme.shadows[3],
  minHeight: "400px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    width: "100%",
    minHeight: "auto",
  },
}));

export const LoginCardContent = styled(CardContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "65%",
  padding: "48px",
  backgroundColor: "#D9D9D9",
  borderRight: "1px solid black",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    borderRight: "none",
  },
}));

export const ImagePlaceholderBox = styled(Box)(({ theme }) => ({
  width: "35%",
  backgroundColor: "#e0e0e0",
  display: "flex",
  alignItems: "stretch",
  justifyContent: "center",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
  },
}));

export const LoginForm = styled("form")({
  display: "flex",
  flexDirection: "column",
});

export const StyledFormControl = styled(FormControl)({});

export const StyledTextField = styled(TextField)({});

export const StyledButton = styled(Button)({
  marginTop: "24px",
});

export const StyledTypography = styled(Typography)({
  textAlign: "center",
  marginTop: "16px",
});

export const StyledLink = styled(Link)({
  color: "#8D5524",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
});

export const RememberMeBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginTop: "8px",
  paddingLeft: "3px",
  "& .MuiFormControlLabel-root": {
    margin: 0,
  },
});

export const ForgotPasswordBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginTop: "4px",
  paddingBottom: "8px",
  paddingLeft: "14px",
  "& a": {
    textAlign: "left",
  },
});
