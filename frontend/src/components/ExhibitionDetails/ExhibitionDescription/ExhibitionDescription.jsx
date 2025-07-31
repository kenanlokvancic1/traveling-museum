import { TextField, Button, Snackbar, Alert } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";
import {
  DescriptionContainer,
  EditButtonSt,
  ButtonContainer,
  ParagraphText,
} from "./ExhibitionDescription.styles";
import { updateExhibitionDescription } from "./exhibitionDetailsHelper";

function ExhibitionDescription({
  description,
  isAdmin,
  onUpdate,
  exhibitionId,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [error, setError] = useState(null);

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
    if (!isEditing) {
      setEditedDescription(description);
      setError(null);
    }
  }, [description, isEditing]);

  const handleSave = async () => {
    try {
      const updatedExhibition = await updateExhibitionDescription(
        exhibitionId,
        editedDescription
      );

      if (updatedExhibition && onUpdate) {
        onUpdate({ description: editedDescription });
      }
      setIsEditing(false);
      setError(null);
      showSnackbar("Exhibition description updated successfully!", "success");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Failed to update description. Please try again.";
      setError(errorMessage);
      showSnackbar(errorMessage, "error");
      console.error("Error updating description:", err);
    }
  };

  const handleCancel = () => {
    setEditedDescription(description);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setEditedDescription(description);
    setIsEditing(true);
  };

  const paragraphs =
    typeof description === "string" ? description.split(/\n\s*\n/) : [];

  return (
    <DescriptionContainer>
      {isEditing ? (
        <>
          <TextField
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            multiline
            rows={6}
            fullWidth
            autoFocus
            placeholder="Enter exhibition description..."
            error={!!error}
            helperText={error}
          />
          <ButtonContainer>
            <Button onClick={handleSave} variant="contained" size="small">
              Save
            </Button>
            <Button onClick={handleCancel} variant="outlined" size="small">
              Cancel
            </Button>
          </ButtonContainer>
        </>
      ) : (
        <>
          {paragraphs.length > 0 && paragraphs[0].trim() !== "" ? (
            paragraphs.map((paragraph, index) => (
              <ParagraphText key={index} variant="body1">
                {paragraph.trim()}
              </ParagraphText>
            ))
          ) : (
            <ParagraphText variant="body1" sx={{ fontStyle: "italic" }}>
              No description available.
            </ParagraphText>
          )}
          {isAdmin && (
            <EditButtonSt onClick={handleEdit} aria-label="Edit description">
              <EditIcon fontSize="small" />
            </EditButtonSt>
          )}
        </>
      )}

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
    </DescriptionContainer>
  );
}

export default ExhibitionDescription;
