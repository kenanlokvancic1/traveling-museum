import React, { useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputAdornment,
  Typography,
} from "@mui/material";
import {
  FormContainer,
  PersonIcon,
  EmailIcon,
  RegisterButton,
  LoginLink,
} from "./RegisterForm.styles";
import { validateForm } from "./registerFormHelper";
import PasswordField from "../PasswordField/PasswordField";

const RegisterForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateForm(formData);

    if (validation.isValid) {
      onSubmit(formData);
    } else {
      setErrors(validation.errors);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <TextField
          name="name"
          label="Name"
          placeholder="Enter Your Name"
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField
          name="email"
          label="Email"
          placeholder="Enter Email Address"
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </FormControl>

      <PasswordField
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
      />

      <RegisterButton type="submit" variant="contained" fullWidth>
        Register
      </RegisterButton>

      <Box mt={2} textAlign="center">
        Already have an account? <LoginLink to="/login">Log In</LoginLink>
      </Box>
    </FormContainer>
  );
};

export default RegisterForm;
