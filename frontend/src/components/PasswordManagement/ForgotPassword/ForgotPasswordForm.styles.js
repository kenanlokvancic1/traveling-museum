import { styled } from "@mui/material/styles";
import { Box, Typography, TextField, Button, FormControl } from "@mui/material";
import { Email as EmailIconMui } from "@mui/icons-material";

export const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "450px",
  padding: "16px",
  margin: "0 auto",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "200px",
    padding: "12px",
  },
}));

export const FormTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    marginBottom: theme.spacing(0.5),
  },
}));

export const InstructionText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
    marginBottom: theme.spacing(1.5),
  },
}));

export const StyledEmailIcon = styled(EmailIconMui)(({ theme }) => ({
  color: "black",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

export const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  marginTop: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
    marginTop: theme.spacing(0.5),
  },
}));

export const SpaceButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(1.5),
    gap: theme.spacing(1),
  },
}));

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: "16px",
  [theme.breakpoints.down("sm")]: {
    marginBottom: "8px",
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    "& .MuiInputAdornment-root": {
      color: "black",
    },
  },
  [theme.breakpoints.down("sm")]: {
    "& .MuiInputBase-root": {
      fontSize: "0.8rem",
      padding: "0px 4px",
      height: "40px",
    },
    "& .MuiFormLabel-root": {
      fontSize: "0.8rem",
      top: "0",
      "&.MuiInputLabel-shrink": {
        top: "0px",
      },
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: "4px",
        borderWidth: "1px",
      },
      "& .MuiInputAdornment-root": {
        height: "auto",
        maxHeight: "36px",
      },
    },
    "& .MuiOutlinedInput-input": {
      padding: "8px 6px",
    },
    "& .MuiInputLabel-outlined": {
      marginTop: "4px",
    },
    marginTop: "4px",
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.75rem",
    padding: "4px 12px",
    minWidth: "60px",
  },
}));
