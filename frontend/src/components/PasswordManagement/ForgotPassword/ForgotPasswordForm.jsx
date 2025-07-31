import React, { useState } from "react";
import { InputAdornment, Snackbar, Alert } from "@mui/material";
import {
  FormContainer,
  FormTitle,
  InstructionText,
  StyledEmailIcon,
  ErrorMessage,
  SpaceButtonContainer,
  StyledFormControl,
  StyledTextField,
  StyledButton,
} from "./ForgotPasswordForm.styles";
import { validateEmail } from "../passwordHelper";
import { forgotPassword } from "../../../api/AuthApi";
import { useNavigate } from "react-router-dom";

export const ForgotPasswordForm = ({ onCancel }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors } = validateEmail(email);
    if (!isValid) {
      setError(errors.email || "Incorrect email, try again");
      return;
    }
    setError("");
    try {
      await forgotPassword(email);
      setSnackbar({ open: true, message: "Reset link sent! Check your email.", severity: "success" });
      setTimeout(() => {
        setSnackbar({ ...snackbar, open: false });
      }, 4000);
    } catch (err) {
      setSnackbar({ open: true, message: err.response?.data?.message || err.message, severity: "error" });
    }
  };

  return (
    <>
      <FormContainer component="form" onSubmit={handleSubmit}>
        <FormTitle variant="h6">Reset Your Password</FormTitle>

        <InstructionText variant="body2">
          Enter your email to receive a password reset link.
        </InstructionText>

        <StyledFormControl fullWidth margin="normal">
          <StyledTextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
            variant="outlined"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <StyledEmailIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </StyledFormControl>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <SpaceButtonContainer>
          <StyledButton variant="outlined" onClick={onCancel}>
            Cancel
          </StyledButton>
          <StyledButton type="submit" variant="contained">
            Send Link
          </StyledButton>
        </SpaceButtonContainer>
      </FormContainer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ForgotPasswordForm;
