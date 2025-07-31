import {
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";

import {
  InfoItem,
  IconWrapper,
  EditButton,
  EditContainer,
  ButtonContainer,
  StyledDateField,
  DateFieldContainer,
} from "./ExhibitionDetails.styles";

import {
  updateExhibitionDates,
  updateExhibitionMuseum,
  fetchMuseums,
  formatDateRange,
} from "./exhibitionDetailsHelper";

function ExhibitionDetails({
  location,
  startDate,
  endDate,
  exhibitionId,
  canEdit,
  onUpdate,
}) {
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [isEditingDates, setIsEditingDates] = useState(false);
  const [editedStartDate, setEditedStartDate] = useState(startDate);
  const [editedEndDate, setEditedEndDate] = useState(endDate);
  const [museums, setMuseums] = useState([]);
  const [selectedMuseumId, setSelectedMuseumId] = useState("");
  const [error, setError] = useState(null);

  // Snackbar states
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" | "error" | "warning" | "info"
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
    if (isEditingDates) {
      const formattedStartDate = new Date(startDate)
        .toISOString()
        .split("T")[0];
      const formattedEndDate = new Date(endDate).toISOString().split("T")[0];
      setEditedStartDate(formattedStartDate);
      setEditedEndDate(formattedEndDate);
    }
  }, [isEditingDates, startDate, endDate]);

  useEffect(() => {
    if (isEditingLocation) {
      const loadMuseums = async () => {
        try {
          const museumList = await fetchMuseums();
          setMuseums(museumList);
          const currentMuseum = museumList.find(
            (museum) => `${museum.name}, ${museum.location}` === location
          );
          if (currentMuseum) {
            setSelectedMuseumId(currentMuseum.museum_id);
          }
        } catch (err) {
          const errorMessage =
            err.response?.data?.message ||
            "Failed to load museums. Please try again.";
          setError(errorMessage);
          showSnackbar(errorMessage, "error");
          console.error("Error loading museums:", err);
        }
      };
      loadMuseums();
    }
  }, [isEditingLocation, location]);

  const handleLocationSave = async () => {
    try {
      await updateExhibitionMuseum(exhibitionId, selectedMuseumId);
      const selectedMuseum = museums.find(
        (museum) => museum.museum_id === selectedMuseumId
      );
      const newLocation = `${selectedMuseum.name}, ${selectedMuseum.location}`;
      onUpdate?.({ location: newLocation });
      setIsEditingLocation(false);
      setError(null);
      showSnackbar("Museum location updated successfully!", "success");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Failed to update location. Please try again.";
      setError(errorMessage);
      showSnackbar(errorMessage, "error");
      console.error("Error updating location:", err);
    }
  };

  const handleDatesSave = async () => {
    try {
      if (!editedStartDate || !editedEndDate) {
        const errorMessage = "Both start and end dates are required.";
        setError(errorMessage);
        showSnackbar(errorMessage, "error");
        return;
      }

      if (new Date(editedStartDate) >= new Date(editedEndDate)) {
        const errorMessage = "Start date must be before end date.";
        setError(errorMessage);
        showSnackbar(errorMessage, "error");
        return;
      }

      await updateExhibitionDates(exhibitionId, editedStartDate, editedEndDate);
      onUpdate?.({ startDate: editedStartDate, endDate: editedEndDate });
      setIsEditingDates(false);
      setError(null);
      showSnackbar("Exhibition dates updated successfully!", "success");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Failed to update dates. Please try again.";
      setError(errorMessage);
      showSnackbar(errorMessage, "error");
      console.error("Error updating dates:", err);
    }
  };

  return (
    <Box>
      <InfoItem>
        <IconWrapper>
          <LocationOnIcon />
        </IconWrapper>
        {isEditingLocation ? (
          <EditContainer>
            <FormControl fullWidth size="small">
              <Select
                value={selectedMuseumId}
                onChange={(e) => setSelectedMuseumId(e.target.value)}
                error={!!error}
              >
                {museums.map((museum) => (
                  <MenuItem key={museum.museum_id} value={museum.museum_id}>
                    {`${museum.name}, ${museum.location}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <ButtonContainer>
              <Button
                onClick={handleLocationSave}
                variant="contained"
                size="small"
                disabled={!selectedMuseumId}
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  setIsEditingLocation(false);
                  setError(null);
                }}
                variant="outlined"
                size="small"
              >
                Cancel
              </Button>
            </ButtonContainer>
            {error && (
              <Typography color="error" variant="caption">
                {error}
              </Typography>
            )}
          </EditContainer>
        ) : (
          <>
            <Typography>{location}</Typography>
            {canEdit && (
              <EditButton onClick={() => setIsEditingLocation(true)}>
                <EditIcon fontSize="small" />
              </EditButton>
            )}
          </>
        )}
      </InfoItem>

      <InfoItem>
        <IconWrapper>
          <CalendarTodayIcon />
        </IconWrapper>
        {isEditingDates ? (
          <EditContainer>
            <DateFieldContainer>
              <StyledDateField
                type="date"
                value={editedStartDate}
                onChange={(e) => setEditedStartDate(e.target.value)}
                size="small"
                minDate="1900-01-01"
              />
              <StyledDateField
                type="date"
                value={editedEndDate}
                onChange={(e) => setEditedEndDate(e.target.value)}
                size="small"
                minDate={editedStartDate}
              />
            </DateFieldContainer>
            <ButtonContainer>
              <Button
                onClick={handleDatesSave}
                variant="contained"
                size="small"
                disabled={!editedStartDate || !editedEndDate}
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  setIsEditingDates(false);
                  setEditedStartDate(startDate);
                  setEditedEndDate(endDate);
                  setError(null);
                }}
                variant="outlined"
                size="small"
              >
                Cancel
              </Button>
            </ButtonContainer>
            {error && (
              <Typography color="error" variant="caption">
                {error}
              </Typography>
            )}
          </EditContainer>
        ) : (
          <>
            <Typography>{formatDateRange(startDate, endDate)}</Typography>
            {canEdit && (
              <EditButton onClick={() => setIsEditingDates(true)}>
                <EditIcon fontSize="small" />
              </EditButton>
            )}
          </>
        )}
      </InfoItem>

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
    </Box>
  );
}

export default ExhibitionDetails;
