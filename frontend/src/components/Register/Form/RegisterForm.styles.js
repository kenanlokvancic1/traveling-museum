import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import {
  Person as PersonIconMui,
  Email as EmailIconMui,
} from "@mui/icons-material";
import { Button as ButtonMui } from "@mui/material";

export const FormContainer = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(1.5),
  },
}));

export const PersonIcon = styled(PersonIconMui)(() => ({
  color: "black",
}));

export const EmailIcon = styled(EmailIconMui)(() => ({
  color: "black",
}));

export const RegisterButton = styled(ButtonMui)(({ theme }) => ({
  marginTop: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(2),
  },
}));

export const LoginLink = styled(Link)(() => ({
  color: "#8D5524",
  textDecoration: "none",
}));
