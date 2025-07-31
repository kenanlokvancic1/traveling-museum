import { useState } from "react";

export const usePasswordFieldToggle = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return { showPassword, handleTogglePassword };
};
