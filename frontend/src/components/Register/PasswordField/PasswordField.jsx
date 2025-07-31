import React from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";
import { usePasswordFieldToggle } from "./passwordFieldHelper";
import { passwordFieldStyles } from "./PasswordField.styles";

const PasswordField = ({
  value,
  onChange,
  placeholder = "Enter Password",
  error,
  ...props
}) => {
  const { showPassword, handleTogglePassword } = usePasswordFieldToggle();

  return (
    <FormControl fullWidth margin="normal">
      <TextField
        label="Password"
        placeholder={placeholder}
        variant="outlined"
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        error={error}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={passwordFieldStyles.icon} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? (
                    <Visibility sx={passwordFieldStyles.icon} />
                  ) : (
                    <VisibilityOff sx={passwordFieldStyles.icon} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        {...props}
      />
    </FormControl>
  );
};

export default PasswordField;
