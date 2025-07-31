import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MenuItem,
  TextField,
  Typography,
  Checkbox,
  ListItem,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormLabel,
  Button,
  FormHelperText,
  CircularProgress,
  Select,
  InputLabel,
} from "@mui/material";

import {
  StyledContainer,
  StyledTitle,
  StyledSection,
  StyledColumn,
  StyledSaveButton,
  CancelButton,
  StyledTextField,
  StyledPaintingsList,
  ActionButtons,
} from "./ExhibitionForm.styles";

import {
  submitExhibitionForm,
  fetchMuseums,
  fetchPaintings,
  validateExhibitionData,
  EXHIBITION_STATUSES,
} from "./exhibitionFormHelper";

const ExhibitionForm = ({
  onSubmit,
  isLoading = false,
  initialData = null,
}) => {
  const navigate = useNavigate();
  const [exhibition, setExhibition] = useState({
    name: "",
    startDate: "",
    endDate: "",
    description: "",
    museum: "",
    status: "in warehouse",
    selectedPaintings: [],
  });

  const [museums, setMuseums] = useState([]);
  const [paintings, setPaintings] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [museumsList, paintingsList] = await Promise.all([
          fetchMuseums(),
          fetchPaintings(),
        ]);
        setMuseums(museumsList);
        setPaintings(paintingsList);
      } catch (error) {
        console.error("Failed to load form data:", error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (initialData) {
      setExhibition({
        name: initialData.name || "",
        startDate: initialData.start_date
          ? new Date(initialData.start_date).toISOString().split("T")[0]
          : "",
        endDate: initialData.end_date
          ? new Date(initialData.end_date).toISOString().split("T")[0]
          : "",
        description: initialData.description || "",
        museum: initialData.museum_id || "",
        status: initialData.status || "in warehouse",
        selectedPaintings: initialData.selectedPaintings || [],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setExhibition({ ...exhibition, [e.target.name]: e.target.value });
  };

  const handlePaintingSelect = (paintingId) => {
    setExhibition((prev) => {
      const isSelected = prev.selectedPaintings.includes(paintingId);
      return {
        ...prev,
        selectedPaintings: isSelected
          ? prev.selectedPaintings.filter((p) => p !== paintingId)
          : [...prev.selectedPaintings, paintingId],
      };
    });
  };

  const handleSubmit = async () => {
    const { isValid, errors: validationErrors } =
      validateExhibitionData(exhibition);

    if (!isValid) {
      setErrors(validationErrors);
      const errorMessages = Object.values(validationErrors).filter(Boolean);
      if (errorMessages.length > 0) {
        return;
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitExhibitionForm(exhibition, !!initialData);
      if (result.success) {
        if (onSubmit) {
          onSubmit(result.data);
        }

        navigate(`/exhibitions/${result.data.exhibition_id}`);
      } else {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      setErrors({ submit: "Failed to save exhibition. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <StyledContainer elevation={3}>
      <StyledTitle variant="h5">
        {initialData ? "Edit Exhibition" : "Add New Exhibition"}
      </StyledTitle>

      <StyledSection>
        <StyledColumn>
          <FormControl error={!!errors.name} fullWidth sx={{ mb: 4 }}>
            <TextField
              label="Name"
              name="name"
              value={exhibition.name}
              onChange={handleChange}
              fullWidth
              required
              disabled={isSubmitting}
            />
            {errors.name && <FormHelperText>{errors.name}</FormHelperText>}
          </FormControl>

          <FormControl error={!!errors.startDate} fullWidth sx={{ mb: 4 }}>
            <StyledTextField
              type="date"
              label="Start Date"
              name="startDate"
              value={exhibition.startDate}
              onChange={handleChange}
              fullWidth
              required
              disabled={isSubmitting}
              InputLabelProps={{ shrink: true }}
            />
            {errors.startDate && (
              <FormHelperText>{errors.startDate}</FormHelperText>
            )}
          </FormControl>

          <FormControl error={!!errors.endDate} fullWidth sx={{ mb: 4 }}>
            <StyledTextField
              type="date"
              label="End Date"
              name="endDate"
              value={exhibition.endDate}
              onChange={handleChange}
              fullWidth
              required
              disabled={isSubmitting}
              InputLabelProps={{ shrink: true }}
            />
            {errors.endDate && (
              <FormHelperText>{errors.endDate}</FormHelperText>
            )}
          </FormControl>

          <FormControl error={!!errors.museum} fullWidth sx={{ mb: 4 }}>
            <InputLabel id="museum-label">Museum</InputLabel>
            <Select
              labelId="museum-label"
              label="Museum"
              name="museum"
              value={exhibition.museum}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            >
              {museums.map((museum) => (
                <MenuItem key={museum.id} value={museum.id}>
                  {museum.name}
                </MenuItem>
              ))}
            </Select>
            {errors.museum && <FormHelperText>{errors.museum}</FormHelperText>}
          </FormControl>

          <FormControl error={!!errors.status} fullWidth sx={{ mb: 4 }}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              label="Status"
              name="status"
              value={exhibition.status}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            >
              {EXHIBITION_STATUSES.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
            {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <TextField
              label="Description"
              name="description"
              value={exhibition.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              disabled={isSubmitting}
            />
          </FormControl>

          <FormControl
            component="fieldset"
            error={!!errors.paintings}
            fullWidth
            sx={{ mb: 4 }}
          >
            <FormLabel component="legend" sx={{ mb: 2 }}>
              Select Paintings
            </FormLabel>
            <FormGroup>
              <StyledPaintingsList>
                {paintings.map((painting) => (
                  <ListItem key={painting.id} disablePadding>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={exhibition.selectedPaintings.includes(
                            painting.id
                          )}
                          onChange={() => handlePaintingSelect(painting.id)}
                          name={`painting-${painting.id}`}
                          disabled={isSubmitting}
                        />
                      }
                      label={
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {painting.image_url && (
                            <img
                              src={painting.image_url}
                              alt={painting.title}
                              style={{
                                width: 50,
                                height: 50,
                                marginRight: 10,
                                objectFit: "cover",
                              }}
                            />
                          )}
                          {painting.title}
                        </div>
                      }
                    />
                  </ListItem>
                ))}
              </StyledPaintingsList>
            </FormGroup>
            {errors.paintings && (
              <FormHelperText>{errors.paintings}</FormHelperText>
            )}
          </FormControl>

          {errors.submit && (
            <FormHelperText error sx={{ mb: 2 }}>
              {errors.submit}
            </FormHelperText>
          )}
        </StyledColumn>
      </StyledSection>

      <ActionButtons>
        <CancelButton
          variant="outlined"
          color="secondary"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          Cancel
        </CancelButton>
        <StyledSaveButton
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
          startIcon={
            isSubmitting && <CircularProgress size={20} color="inherit" />
          }
        >
          {isSubmitting ? "Saving..." : "Save Exhibition"}
        </StyledSaveButton>
      </ActionButtons>
    </StyledContainer>
  );
};

export default ExhibitionForm;
