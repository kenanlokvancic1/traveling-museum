import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styles } from "./PasswordManagement.styles";
import { validatePasswordChange } from "./passwordHelper";
import { changePassword } from "../../api/AuthApi";
import ForgotPasswordForm from "./ForgotPassword";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/userSlice";
import { useDispatch } from "react-redux";

const PasswordChangeForm = ({ onForgotPassword }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");
    setSuccessMessage("");

    const { isValid, errors } = validatePasswordChange(
      currentPassword,
      newPassword,
      confirmPassword
    );

    if (isValid) {
      try {
        await changePassword({ currentPassword, newPassword, confirmPassword });
        setSuccessMessage("Password changed successfully! Logging out...");
        dispatch(logout());
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Something went wrong";

        if (errorMessage.toLowerCase().includes("current password")) {
          setErrors((prev) => ({ ...prev, currentPassword: errorMessage }));
        } else {
          setGeneralError(errorMessage);
        }
      }
    } else {
      setErrors(errors);
    }
  };

  if (showForgotPassword) {
    return (
      <ForgotPasswordForm
        onCancel={() => setShowForgotPassword(false)}
        onSubmit={() => {
          setShowForgotPassword(false);
          onForgotPassword && onForgotPassword();
        }}
      />
    );
  }

  return (
    <Box component="form" style={styles.formContainer} onSubmit={handleSubmit}>
      <Typography variant="h6" style={styles.formTitle}>
        Password Management
      </Typography>

      <FormControl
        fullWidth
        variant="outlined"
        error={!!errors.currentPassword}
        sx={styles.formControl}
      >
        <InputLabel htmlFor="current-password">Current Password</InputLabel>
        <OutlinedInput
          id="current-password"
          type={showCurrentPassword ? "text" : "password"}
          value={currentPassword}
          onChange={(e) => {
            setCurrentPassword(e.target.value);
            setErrors((prev) => ({ ...prev, currentPassword: "" }));
            setGeneralError("");
            setSuccessMessage("");
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                edge="end"
              >
                {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label="Current Password"
        />
        {errors.currentPassword && (
          <Typography style={styles.errorMessage}>
            {errors.currentPassword}
          </Typography>
        )}
      </FormControl>

      <FormControl
        fullWidth
        variant="outlined"
        error={!!errors.newPassword}
        sx={styles.formControl}
      >
        <InputLabel htmlFor="new-password">New Password</InputLabel>
        <OutlinedInput
          id="new-password"
          type={showNewPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setErrors((prev) => ({ ...prev, newPassword: "" }));
            setGeneralError("");
            setSuccessMessage("");
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowNewPassword((prev) => !prev)}
                edge="end"
              >
                {showNewPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label="New Password"
        />
        {errors.newPassword && (
          <Typography style={styles.errorMessage}>
            {errors.newPassword}
          </Typography>
        )}
      </FormControl>

      <FormControl
        fullWidth
        variant="outlined"
        error={!!errors.confirmPassword}
        sx={styles.formControl}
      >
        <InputLabel htmlFor="confirm-password">Verify New Password</InputLabel>
        <OutlinedInput
          id="confirm-password"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setErrors((prev) => ({ ...prev, confirmPassword: "" }));
            setGeneralError("");
            setSuccessMessage("");
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                edge="end"
              >
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label="Verify New Password"
        />
        {errors.confirmPassword && (
          <Typography style={styles.errorMessage}>
            {errors.confirmPassword}
          </Typography>
        )}
      </FormControl>

      {generalError && (
        <Typography style={styles.errorMessage}>{generalError}</Typography>
      )}
      {successMessage && (
        <Typography style={{ ...styles.successMessage, color: "green" }}>
          {successMessage}
        </Typography>
      )}

      <Typography
        style={styles.forgotPasswordLink}
        onClick={() => setShowForgotPassword(true)}
      >
        Forgot Password?
      </Typography>

      <Box style={styles.buttonContainer}>
        <Button variant="contained" type="submit">
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default PasswordChangeForm;
