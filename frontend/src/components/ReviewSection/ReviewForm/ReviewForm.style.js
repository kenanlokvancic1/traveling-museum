import { styled } from "@mui/material/styles";
import { Box, Typography, TextField, Button } from "@mui/material";

export const FormContainer = styled(Box)(({ theme }) => ({
  border: "1px solid #e0e0e0",
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
}));

export const FormTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(2),
}));

export const RatingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiOutlinedInput-root": {
    borderRadius: 0,
  },
}));

export const ButtonsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

export const CancelButton = styled(Button)(({ theme }) => ({
  borderRadius: 0,
  textTransform: "none",
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  borderRadius: 0,
  textTransform: "none",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));
