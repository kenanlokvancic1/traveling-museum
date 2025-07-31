import React, { useState, useEffect } from "react";
import {
  MenuItem,
  TextField,
  FormControl,
  FormHelperText,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import AddPhotoAlternate from "@mui/icons-material/AddPhotoAlternate";
import { useNavigate } from "react-router-dom";
import { fetchArtists, submitArtworkForm } from "./artworkFormHelper";
import {
  StyledContainer,
  StyledTitle,
  StyledSection,
  StyledColumn,
  StyledSaveButton,
} from "./ArtworkForm.styles";

const provenanceOptions = [
  "Private Collection",
  "Auction House",
  "Gallery",
  "Inherited",
  "Other",
];

const ArtworkForm = ({ onSubmit }) => {
  const navigate = useNavigate();

  const [artwork, setArtwork] = useState({
    title: "",
    artist: "",
    year: "",
    medium: "",
    dimensions: "",
    location: "",
    description: "",
    provenance: "",
    imageUrl: "",
  });

  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const artistsData = await fetchArtists();

        setArtists(Array.isArray(artistsData) ? artistsData : []);
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          "Failed to load artists. Please try again.";
        showSnackbar(errorMessage, "error");
        console.error("Error loading artists:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArtwork((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!artwork.title) tempErrors.title = "Title is required";
    if (!artwork.artist) tempErrors.artist = "Artist is required";
    if (!artwork.year) tempErrors.year = "Year is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const result = await submitArtworkForm(artwork);
        if (result.success) {
          showSnackbar("Artwork created successfully!", "success");
          if (onSubmit) {
            onSubmit(result.data);
          }
          setArtwork({
            title: "",
            artist: "",
            year: "",
            medium: "",
            dimensions: "",
            location: "",
            description: "",
            provenance: "",
            imageUrl: "",
          });
          setErrors({});

          setTimeout(() => {
            if (result.data?.painting_id) {
              navigate(`/artworks/${result.data.painting_id}`);
            }
          }, 4000);
        } else {
          const errorMessage =
            result.error || "Failed to create artwork. Please try again.";
          setErrors({ submit: errorMessage });
          showSnackbar(errorMessage, "error");
        }
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          "Failed to save artwork. Please try again.";
        setErrors({ submit: errorMessage });
        showSnackbar(errorMessage, "error");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (loading) {
    return (
      <StyledContainer elevation={3}>
        <div
          style={{ display: "flex", justifyContent: "center", padding: "2rem" }}
        >
          <CircularProgress />
        </div>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer elevation={3}>
      <StyledTitle variant="h5">
        <AddPhotoAlternate />
        Add New Artwork
      </StyledTitle>

      <StyledSection>
        <StyledColumn>
          <FormControl error={!!errors.title}>
            <TextField
              label="Title"
              name="title"
              value={artwork.title}
              onChange={handleChange}
              fullWidth
              required
            />
            {errors.title && <FormHelperText>{errors.title}</FormHelperText>}
          </FormControl>

          <FormControl error={!!errors.artist}>
            <TextField
              select
              label="Artist"
              name="artist"
              value={artwork.artist}
              onChange={handleChange}
              fullWidth
              required
            >
              {artists && artists.length > 0 ? (
                artists.map((artist) => (
                  <MenuItem key={artist.artist_id} value={artist.artist_id}>
                    {artist.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No artists available</MenuItem>
              )}
            </TextField>
            {errors.artist && <FormHelperText>{errors.artist}</FormHelperText>}
          </FormControl>

          <TextField
            label="Year"
            name="year"
            value={artwork.year}
            onChange={handleChange}
            fullWidth
            required
            type="number"
            slotProps={{ input: { min: 1000, max: new Date().getFullYear() } }}
          />

          <TextField
            label="Medium"
            name="medium"
            value={artwork.medium}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Dimensions"
            name="dimensions"
            value={artwork.dimensions}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Location"
            name="location"
            value={artwork.location}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            select
            label="Provenance"
            name="provenance"
            value={artwork.provenance}
            onChange={handleChange}
            fullWidth
          >
            {provenanceOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </StyledColumn>

        <StyledColumn>
          <TextField
            label="Image URL"
            name="imageUrl"
            value={artwork.imageUrl}
            onChange={handleChange}
            fullWidth
            placeholder="Enter the URL of the artwork image"
          />
          {artwork.imageUrl && (
            <img
              src={artwork.imageUrl}
              alt="Artwork preview"
              style={{
                width: "100%",
                marginTop: "16px",
                maxHeight: "400px",
                objectFit: "contain",
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/400x400?text=Invalid+Image+URL";
              }}
            />
          )}
        </StyledColumn>
      </StyledSection>

      <TextField
        label="Description"
        name="description"
        value={artwork.description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        sx={{ mt: 2 }}
      />

      {errors.submit && (
        <FormHelperText error sx={{ mt: 2 }}>
          {errors.submit}
        </FormHelperText>
      )}

      <StyledSaveButton
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Save Artwork"}
      </StyledSaveButton>

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

export default ArtworkForm;
