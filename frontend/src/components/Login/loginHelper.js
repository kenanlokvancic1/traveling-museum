import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/userSlice";
import { loginUser } from "../../api/AuthApi";

export const useLoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

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

  const validateForm = (data) => {
    const errors = {};

    if (!data.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
    }

    if (!data.password) {
      errors.password = "Password is required";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateForm(formData);

    if (validation.isValid) {
      try {
        const res = await loginUser({
          email: formData.email,
          password: formData.password,
        });
        if (res && res.user && res.token) {
          dispatch(login(res.user));
          if (res.user.role === "admin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/");
          }
        } else {
          alert("Unexpected response from server");
        }
      } catch (error) {
        const message =
          error?.response?.data?.message || "Login failed. Check credentials.";
        alert(message);
      }
    } else {
      setErrors(validation.errors);
    }
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    setIsForgotPasswordOpen(true);
  };

  const handleCloseForgotPassword = () => {
    setIsForgotPasswordOpen(false);
  };

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  return {
    formData,
    showPassword,
    isForgotPasswordOpen,
    errors,
    handleTogglePassword,
    handleChange,
    handleSubmit,
    handleForgotPasswordClick,
    handleCloseForgotPassword,
  };
};
