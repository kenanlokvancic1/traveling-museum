import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, FormHelperText, Snackbar, Alert } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { validateMuseumData, submitMuseumForm } from "./museumFormHelper";
import {
  StyledTitle,
  StyledSection,
  StyledColumn,
  StyledSaveButton,
  StyledBackButton,
  StyledForm,
  StyledContainer,
} from "./MuseumForm.styles";

const MuseumForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    website: "",
    contact: "",
    description: "",
    coordinates: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateMuseumData(formData);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitMuseumForm(formData);
      if (result.success) {
        showSnackbar("Museum created successfully!", "success");
        setTimeout(() => {
          navigate("/museums");
        }, 1500);
      } else {
        const errorMessage =
          result.error || "Failed to create museum. Please try again.";
        setErrors({ submit: errorMessage });
        showSnackbar(errorMessage, "error");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to submit form. Please try again.";
      setErrors({ submit: errorMessage });
      showSnackbar(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    navigate("/museums");
  };

  return (
    <StyledContainer elevation={3}>
      <StyledTitle>
        <AddPhotoAlternateIcon /> Add New Museum
      </StyledTitle>
      <StyledForm component="form" onSubmit={handleSubmit} noValidate>
        <StyledSection>
          <StyledColumn>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
              required
              margin="normal"
              disabled={isSubmitting}
            />
            <TextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              error={!!errors.location}
              helperText={errors.location}
              fullWidth
              required
              margin="normal"
              disabled={isSubmitting}
            />
            <TextField
              label="Website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              error={!!errors.website}
              helperText={errors.website}
              fullWidth
              margin="normal"
              disabled={isSubmitting}
            />
            <TextField
              label="Coordinates"
              name="coordinates"
              value={formData.coordinates}
              onChange={handleChange}
              error={!!errors.coordinates}
              helperText={
                errors.coordinates || "Format: 40.7128° N, 74.0060° W"
              }
              placeholder="40.7128° N, 74.0060° W"
              fullWidth
              margin="normal"
              disabled={isSubmitting}
            />
          </StyledColumn>
          <StyledColumn>
            <TextField
              label="Contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              error={!!errors.contact}
              helperText={errors.contact}
              fullWidth
              margin="normal"
              disabled={isSubmitting}
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
              fullWidth
              required
              multiline
              rows={4}
              margin="normal"
              disabled={isSubmitting}
            />
            {errors.submit && (
              <FormHelperText error>{errors.submit}</FormHelperText>
            )}
          </StyledColumn>
        </StyledSection>

        <StyledSaveButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Museum"}
        </StyledSaveButton>
      </StyledForm>
      <StyledBackButton startIcon={<ArrowBackIcon />} onClick={handleGoBack}>
        Back to Museums
      </StyledBackButton>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </StyledContainer>
  );
};

export default MuseumForm;
