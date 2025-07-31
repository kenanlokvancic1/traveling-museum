import { Dialog, Button, TextField, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  maxWidth: "xs",
  fullWidth: true,
}));

export const StyledDialogTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1),
}));

export const StyledDialogContent = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(3),
}));

export const InputContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(1),
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "45px",
  height: "55px",
  "& input": {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
}));

export const StyledDialogActions = styled(Box)(({ theme }) => ({
  justifyContent: "center",
  paddingBottom: theme.spacing(3),
  flexDirection: "column",
  display: "flex",
  alignItems: "center",
}));

export const ContinueButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  width: "50%",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  boxShadow: "none",
  "&:hover": {
    boxShadow: "0px 6px 15px 2px rgba(139, 69, 19, 0.6)",
    backgroundColor: theme.palette.primary.main,
  },
  "&:active": {
    backgroundColor: theme.palette.primary.main,
  },
}));

export const ResendButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: "bold",
  textTransform: "none",
  "&:hover": {
    textDecoration: "underline",
    backgroundColor: "transparent",
  },
}));

export const CheckIconWrapper = styled(Box)(({ theme }) => ({
  color: "green",
  fontSize: "30px",
}));
