import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/userSlice";
import {
  LoginCard,
  LoginCardContent,
  ImagePlaceholderBox,
  LoginForm,
  StyledFormControl,
  StyledTextField,
  StyledButton,
  StyledLink,
  StyledTypography,
  RememberMeBox,
  ForgotPasswordBox,
} from "./Login.styles";
import {
  InputAdornment,
  IconButton,
  FormControlLabel,
  Dialog,
  DialogContent,
  Checkbox,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ForgotPasswordForm } from "../PasswordManagement/ForgotPassword/ForgotPasswordForm";
import { loginUser } from "../../api/AuthApi";
import { showSuccessToast, showErrorToast } from "../CustomToast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password, rememberMe });
      if (res?.user && res?.token) {
        dispatch(login(res.user));
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("token", res.token);
        showSuccessToast("Login successful! Welcome back.");
        navigate(res.user.role === "admin" ? "/admin-dashboard" : "/");
      } else {
        showErrorToast("Unexpected server response.");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || "Login failed. Check credentials.";
      showErrorToast(message);
    }
  };

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token && user) {
      navigate(user.role === "admin" ? "/admin-dashboard" : "/");
    }
  }, [user, navigate]);

  return (
    <LoginCard>
      <LoginCardContent>
        <StyledTypography variant="h4">Log In</StyledTypography>

        <LoginForm onSubmit={handleSubmit} noValidate>
          <StyledFormControl fullWidth margin="normal">
            <StyledTextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              variant="outlined"
              required
            />
          </StyledFormControl>

          <StyledFormControl fullWidth margin="normal">
            <StyledTextField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              variant="outlined"
              required
              slots={{
                endAdornment: InputAdornment,
              }}
              slotProps={{
                endAdornment: {
                  position: "end",
                  children: (
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  ),
                },
              }}
            />
          </StyledFormControl>

          <RememberMeBox>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                />
              }
              label="Remember me"
            />
          </RememberMeBox>

          <ForgotPasswordBox>
            <StyledLink
              to="#"
              onClick={(e) => {
                e.preventDefault();
                setIsForgotPasswordOpen(true);
              }}
            >
              Forgot password?
            </StyledLink>
          </ForgotPasswordBox>

          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Log In
          </StyledButton>

          <StyledTypography variant="body2">
            Don't have an account?{" "}
            <StyledLink to="/register">Register</StyledLink>
          </StyledTypography>
        </LoginForm>
      </LoginCardContent>

      <ImagePlaceholderBox>
        <img src="FormsImage.jpg" alt="Login" />
      </ImagePlaceholderBox>

      <Dialog
        open={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      >
        <DialogContent>
          <ForgotPasswordForm
            onCancel={() => setIsForgotPasswordOpen(false)}
            onSubmit={() => setIsForgotPasswordOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </LoginCard>
  );
};

export default Login;
