import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  InputAdornment,
  IconButton,
  Alert,
  FormHelperText,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { resetPassword } from "../../api/AuthApi";
import {
  Container,
  Title,
  StyledFormControl,
  StyledInputLabel,
  StyledOutlinedInput,
  SubmitButton,
  MessageAlert,
} from "./PasswordResetForm.styles";

const PasswordResetForm = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirm, setShowConfirm] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }
    try {
      await resetPassword(token, { newPassword: password, confirmPassword });
      setSuccess("Password successfully reset! Redirecting to login…");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <Container>
      {success && <MessageAlert severity="success">{success}</MessageAlert>}
      {error && <MessageAlert severity="error">{error}</MessageAlert>}

      <Title variant="h6">Reset Your Password</Title>

      <Box component="form" onSubmit={handleSubmit}>
        <StyledFormControl fullWidth variant="outlined" error={passwordError}>
          <StyledInputLabel htmlFor="new-password">
            New Password
          </StyledInputLabel>
          <StyledOutlinedInput
            id="new-password"
            type={showPassword ? "password" : "text"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="New Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((v) => !v)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {passwordError && <FormHelperText>{passwordError}</FormHelperText>}
        </StyledFormControl>

        <StyledFormControl fullWidth variant="outlined">
          <StyledInputLabel htmlFor="confirm-password">
            Confirm Password
          </StyledInputLabel>
          <StyledOutlinedInput
            id="confirm-password"
            type={showConfirm ? "password" : "text"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label="Confirm Password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirm((v) => !v)}
                  edge="end"
                >
                  {showConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </StyledFormControl>

        <SubmitButton
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          Reset Password
        </SubmitButton>
      </Box>
    </Container>
  );
};

export default PasswordResetForm;
