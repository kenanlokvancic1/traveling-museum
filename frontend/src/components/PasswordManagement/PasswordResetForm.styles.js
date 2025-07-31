import { styled } from "@mui/material/styles";
import { Box, Button, FormControl, Alert, Typography, OutlinedInput, InputLabel } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
}));

export const Title = styled(Typography)({
  marginBottom: 16,
  textAlign: "center",
});

export const StyledFormControl = styled(FormControl)({
  marginBottom: 16,
  position: "relative",
  "& .MuiInputLabel-root": {
    background: "transparent",
    padding: "0 4px",
    transform: "translate(14px, 12px) scale(1)",
    zIndex: 1,
  },
  "& .MuiInputLabel-shrink": {
    transform: "translate(14px, -6px) scale(0.75)",
  },
});

export const StyledInputLabel = styled(InputLabel)({
  background: "transparent",
  padding: "0 4px",
});

export const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.text.primary,
  },
}));

export const SubmitButton = styled(Button)({
  marginTop: 24,
});

export const MessageAlert = styled(Alert)({
  marginBottom: 16,
});
