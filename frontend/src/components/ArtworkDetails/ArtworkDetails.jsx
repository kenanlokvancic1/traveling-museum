import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Snackbar,
  Alert,
  MenuItem,
} from "@mui/material";
import {
  Favorite,
  Share,
  Edit,
  Save,
  Cancel,
  Close,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import ExhibitionsDialog from "./ExhibitionsDialog";
import ConditionReport from "./ConditionReport";
import {
  StyledContainer,
  StyledImage,
  StyledDetails,
  StyledInfoRow,
  StyledLabel,
  StyledValue,
  StyledSection,
  StyledEditField,
  StyledFavoriteIcon,
  TopSection,
  HeaderBox,
  ButtonsWrapper,
  InfoWrapper,
  ImageDialog,
  DialogImage,
  CloseButton,
  StyledFormControl,
  StyledSelect,
  StatusBox,
  ImageBox,
  ResponsiveContainer,
} from "./ArtworkDetails.styles";
import {
  createFavorite,
  deleteFavoriteByPaintingAndUser,
  checkFavorite,
} from "../../api/FavoriteApi";
import { updatePainting } from "../../api/PaintingApi";
import { getAllArtists } from "../../api/ArtistApi";
import { getArtistById } from "../../api/ArtistApi";

const ArtworkDetails = ({
  artwork,
  artist,
  iscurator,
  isLoggedIn,
  onArtworkUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedArtwork, setEditedArtwork] = useState(artwork);
  const [showConditionReport, setShowConditionReport] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [availableArtists, setAvailableArtists] = useState([]);

  const [favoriteSnackbar, setFavoriteSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const user = useSelector((state) => state.user.user);

  const showFavoriteSnackbar = (message, severity = "success") => {
    setFavoriteSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseFavoriteSnackbar = () => {
    setFavoriteSnackbar((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    const checkIsFavorite = async () => {
      if (user && artwork && artwork.painting_id) {
        setIsChecking(true);
        try {
          const userId = user.id || user.user_id;
          const response = await checkFavorite(artwork.painting_id, userId);
          setIsFavorite(response.exists);
        } catch (error) {
          console.error("Error checking favorite status:", error);
        } finally {
          setIsChecking(false);
        }
      }
    };

    if (isLoggedIn) {
      checkIsFavorite();
    }
  }, [user, artwork, isLoggedIn]);

  useEffect(() => {
    setEditedArtwork({
      ...artwork,
      artist_id: artist.artist_id,
    });
  }, [artwork, artist]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const artists = await getAllArtists();
        setAvailableArtists(artists);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    if (isEditing) {
      fetchArtists();
    }
  }, [isEditing]);

  const handleEditToggle = async () => {
    if (isEditing) {
      try {
        const artistId = editedArtwork.artist_id || artist.artist_id;

        if (!artistId) {
          setSaveError(
            "Artist ID is missing. Please select an artist before saving."
          );
          return;
        }

        const updatePayload = {
          title: editedArtwork.title,
          year: editedArtwork.year ? parseInt(editedArtwork.year) : null,
          medium: editedArtwork.medium,
          dimensions: editedArtwork.dimensions,
          description: editedArtwork.description,
          location: editedArtwork.location,
          provenance: editedArtwork.provenance,
          shares: editedArtwork.shares,
          artist_id: parseInt(artistId),
        };

        const requiredFields = ["title", "artist_id"];
        const missingFields = requiredFields.filter(
          (field) => !updatePayload[field]
        );

        if (missingFields.length > 0) {
          setSaveError(`Missing required fields: ${missingFields.join(", ")}`);
          return;
        }

        const response = await updatePainting(
          artwork.painting_id,
          updatePayload
        );

        const updatedArtist = await getArtistById(artistId);

        setEditedArtwork({
          ...response,
          artist_id: artistId,
        });

        if (onArtworkUpdate) {
          onArtworkUpdate({
            ...response,
            artist: updatedArtist,
          });
        }

        setSaveSuccess(true);
        setIsEditing(false);
      } catch (error) {
        setSaveError(
          error.response?.data?.message ||
            error.response?.data?.error ||
            error.response?.data?.detail ||
            "Failed to save changes. Please try again."
        );
      }
    } else {
      setIsEditing(true);
      setSaveError(null);
      setSaveSuccess(false);
    }
  };

  const handleChange = (field, value) => {
    if (field === "artist") {
      const selectedArtist = availableArtists.find(
        (a) => a.artist_id === value
      );
      if (selectedArtist) {
        setEditedArtwork((prev) => ({
          ...prev,
          artist_id: selectedArtist.artist_id,
        }));
      } else {
        console.error("Selected artist not found in available artists");
      }
      return;
    }
    setEditedArtwork((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancelEdit = () => {
    setEditedArtwork(artwork);
    setIsEditing(false);
    setSaveError(null);
  };

  const toggleFavorite = async () => {
    if (!user || (!user.id && !user.user_id)) {
      console.error("User or user ID is missing", user);
      showFavoriteSnackbar("Error: User information not found", "error");
      return;
    }

    const userId = user.id || user.user_id;

    try {
      if (isFavorite) {
        await deleteFavoriteByPaintingAndUser(artwork.painting_id, userId);
        showFavoriteSnackbar("Removed from favorites", "success");
      } else {
        await createFavorite({
          painting_id: artwork.painting_id,
          user_id: userId,
        });
        showFavoriteSnackbar("Added to favorites", "success");
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to update favorites. Please try again.";
      showFavoriteSnackbar(errorMessage, "error");
    }
  };

  const handleConditionReportToggle = () => {
    setShowConditionReport(!showConditionReport);
  };
  const handleImageClick = () => setShowImagePopup(true);
  const handleCloseImagePopup = () => setShowImagePopup(false);

  const displayFields = [
    "title",
    "artist",
    "year",
    "medium",
    "dimensions",
    "description",
    "location",
    "provenance",
    "shares",
  ];

  const formatLabel = (key) =>
    key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <StyledContainer>
      <TopSection>
        <HeaderBox>
          <Box>
            <Typography variant="h4">{artwork.title}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton>
              <Share />
            </IconButton>
            {isLoggedIn && (
              <StyledFavoriteIcon
                onClick={toggleFavorite}
                isFavorite={isFavorite}
                disabled={isChecking}
              >
                <Favorite />
              </StyledFavoriteIcon>
            )}
          </Box>
        </HeaderBox>
        <Divider />
      </TopSection>

      <ResponsiveContainer>
        <ImageBox>
          <StyledImage
            src={
              artwork.image_url ||
              artwork.imageUrl ||
              "https://via.placeholder.com/500x300.png?text=Artwork+Image"
            }
            alt={artwork.title}
            onClick={handleImageClick}
          />
          {iscurator && (
            <StatusBox>
              <Typography variant="subtitle2">
                Status: {artwork.status}
              </Typography>
              <Typography variant="subtitle2">
                Tracking: {artwork.tracking}
              </Typography>
            </StatusBox>
          )}
        </ImageBox>

        <InfoWrapper>
          <StyledDetails>
            {displayFields.map((field, index) => (
              <StyledInfoRow key={field}>
                <StyledLabel>{formatLabel(field)}:</StyledLabel>
                {isEditing ? (
                  field === "artist" ? (
                    <StyledFormControl
                      isLastField={index === displayFields.length - 1}
                    >
                      <StyledSelect
                        value={editedArtwork.artist_id || artist.artist_id}
                        onChange={(e) => handleChange("artist", e.target.value)}
                      >
                        {availableArtists.map((availableArtist) => (
                          <MenuItem
                            key={availableArtist.artist_id}
                            value={availableArtist.artist_id}
                          >
                            {availableArtist.name}
                          </MenuItem>
                        ))}
                      </StyledSelect>
                    </StyledFormControl>
                  ) : (
                    <StyledEditField
                      value={editedArtwork[field] || ""}
                      onChange={(e) => handleChange(field, e.target.value)}
                    />
                  )
                ) : (
                  <StyledValue>
                    {field === "artist" ? artist.name : artwork[field] || "—"}
                  </StyledValue>
                )}
              </StyledInfoRow>
            ))}
          </StyledDetails>

          {iscurator && (
            <ButtonsWrapper>
              {isEditing ? (
                <>
                  <Button
                    onClick={handleEditToggle}
                    startIcon={<Save />}
                    variant="outlined"
                    color="success"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={handleCancelEdit}
                    startIcon={<Cancel />}
                    variant="outlined"
                    color="error"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleEditToggle}
                  startIcon={<Edit />}
                  variant="outlined"
                >
                  Edit
                </Button>
              )}
              <Button
                onClick={() => setShowDialog(true)}
                variant="contained"
                color="secondary"
              >
                Manage Exhibition
              </Button>
              <ExhibitionsDialog
                open={showDialog}
                onClose={() => setShowDialog(false)}
                paintingId={artwork.painting_id}
              />
            </ButtonsWrapper>
          )}

          {iscurator && (
            <StyledSection onClick={handleConditionReportToggle}>
              <Typography variant="h6">
                Condition Report {showConditionReport ? "▲" : "▼"}
              </Typography>
            </StyledSection>
          )}

          {showConditionReport && (
            <ConditionReport
              iscurator={iscurator}
              isOpen={showConditionReport}
              paintingId={artwork.painting_id}
            />
          )}
        </InfoWrapper>
      </ResponsiveContainer>

      {showImagePopup && (
        <ImageDialog onClick={handleCloseImagePopup}>
          <DialogImage
            src={
              artwork.image_url ||
              artwork.imageUrl ||
              "https://via.placeholder.com/500x300.png?text=Artwork+Image"
            }
            alt={artwork.title}
            onClick={(e) => e.stopPropagation()}
          />
          <CloseButton onClick={handleCloseImagePopup}>
            <Close />
          </CloseButton>
        </ImageDialog>
      )}

      <Snackbar
        open={saveError !== null}
        autoHideDuration={6000}
        onClose={() => setSaveError(null)}
      >
        <Alert onClose={() => setSaveError(null)} severity="error">
          {saveError}
        </Alert>
      </Snackbar>

      <Snackbar
        open={saveSuccess}
        autoHideDuration={3000}
        onClose={() => setSaveSuccess(false)}
      >
        <Alert onClose={() => setSaveSuccess(false)} severity="success">
          Changes saved successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={favoriteSnackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseFavoriteSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseFavoriteSnackbar}
          severity={favoriteSnackbar.severity}
          sx={{ width: "100%" }}
        >
          {favoriteSnackbar.message}
        </Alert>
      </Snackbar>
    </StyledContainer>
  );
};

export default ArtworkDetails;
