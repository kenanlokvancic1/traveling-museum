import React, { useEffect, useState, useCallback } from "react";
import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { ArrowBack, ArrowForward, Add, Delete } from "@mui/icons-material";
import {
  CarouselContainer,
  CardsTrack,
  CardContainer,
  CarouselImage,
  AddButton,
  DialogImage,
  StyledDialog,
  StyledImageListItem,
  StyledImage,
  StyledImageList,
  StyledDialogContent,
  StyledBox,
  StyledNavButtonLeft,
  StyledNavButtonRight,
  ManageDialog,
  DialogTitleStyled,
  DialogActionsStyled,
  ErrorMessageText,
  ImageTitleText,
  RemoveButtonContainer,
  DialogSectionTitle,
  StyledMuiAlert,
} from "./ExhibitionCarousel.styles";
import { useExhibitionCarousel } from "./ExhibitionCarouselHelper";
import { getPaintingsByExhibition } from "../../api/ExhibitionPainting";
import { getAllPaintings, getPaintingById } from "../../api/PaintingApi";
import Snackbar from "@mui/material/Snackbar";

const ExhibitionCarousel = ({
  images,
  isAdmin,
  exhibitionId,
  onImageRemoved,
  onImagesAdded,
  actionMessage,
  actionMessageType,
  clearMessage,
}) => {
  const {
    currentIndex,
    isPreviewDialogOpen,
    isManageDialogOpen,
    selectedImageIndex,
    visibleCards,
    trackRef,
    handlePrevious,
    handleNext,
    handleImageClick,
    handleClosePreviewDialog,
    handleAddClick,
    handleCloseManageDialog,
  } = useExhibitionCarousel(images);

  const [currentPaintings, setCurrentPaintings] = useState([]);
  const [availablePaintings, setAvailablePaintings] = useState([]);
  const [selectedToAdd, setSelectedToAdd] = useState([]);
  const [errorMessageLocal, setErrorMessageLocal] = useState("");

  const fetchPaintings = useCallback(async () => {
    if (!exhibitionId) return;
    try {
      const current = await getPaintingsByExhibition(exhibitionId);
      const all = await getAllPaintings();

      const currentWithDetails = await Promise.all(
        current.map(async (item) => {
          const details = await getPaintingById(item.painting_id);
          return { ...details, exhibitionPaintingId: item.id };
        })
      );

      const available = all.filter(
        (p) => !current.some((c) => c.painting_id === p.painting_id)
      );

      setCurrentPaintings(currentWithDetails);
      setAvailablePaintings(available);
    } catch (error) {
      console.error("Failed to fetch paintings:", error);
    }
  }, [exhibitionId]);

  useEffect(() => {
    if (isManageDialogOpen && exhibitionId) {
      fetchPaintings();
    }
  }, [isManageDialogOpen, exhibitionId, fetchPaintings]);

  const handleRemove = async (paintingId, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (onImageRemoved && exhibitionId) {
      await onImageRemoved(paintingId);
      await fetchPaintings();
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedToAdd((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleAddSelected = async (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (selectedToAdd.length > 0 && onImagesAdded && exhibitionId) {
      try {
        await onImagesAdded(selectedToAdd);
        setSelectedToAdd([]);
        await fetchPaintings();
        setErrorMessageLocal("");
      } catch (error) {
        if (
          error.message &&
          error.message.includes(
            "Painting is assigned to an overlapping exhibition"
          )
        ) {
          setErrorMessageLocal(
            "This painting is already assigned to another exhibition."
          );
        } else {
          setErrorMessageLocal(
            "An error occurred while adding the painting(s)."
          );
        }
      }
    }
  };

  return (
    <CarouselContainer>
      <StyledBox>
        <CardsTrack ref={trackRef}>
          {images.map((image, index) => (
            <CardContainer key={index}>
              <CarouselImage
                src={image}
                alt={`Exhibition image ${index + 1}`}
                onClick={() => handleImageClick(index)}
              />
            </CardContainer>
          ))}
        </CardsTrack>

        {images.length > 1 && (
          <>
            <StyledNavButtonLeft
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              <ArrowBack />
            </StyledNavButtonLeft>
            <StyledNavButtonRight
              onClick={handleNext}
              disabled={currentIndex >= images.length - visibleCards}
            >
              <ArrowForward />
            </StyledNavButtonRight>
          </>
        )}
      </StyledBox>

      {isAdmin && (
        <AddButton onClick={handleAddClick}>
          <Add />
        </AddButton>
      )}

      <StyledDialog
        open={isPreviewDialogOpen}
        onClose={handleClosePreviewDialog}
        onClick={handleClosePreviewDialog}
      >
        <DialogImage
          src={images[selectedImageIndex]}
          alt={`Exhibition image ${selectedImageIndex + 1}`}
        />
      </StyledDialog>

      <ManageDialog
        open={isManageDialogOpen}
        onClose={(event, reason) => {
          if (reason === "backdropClick" || reason === "escapeKeyDown") {
            return;
          }
          handleCloseManageDialog(event, reason);
        }}
        disableEscapeKeyDown
      >
        <DialogTitleStyled>Manage Exhibition Paintings</DialogTitleStyled>

        {errorMessageLocal && (
          <ErrorMessageText color="error" variant="body2">
            {errorMessageLocal}
          </ErrorMessageText>
        )}

        <StyledDialogContent>
          <Typography variant="h6">Currently in Exhibition</Typography>
          <StyledImageList cols={3}>
            {currentPaintings.map((img) => (
              <StyledImageListItem key={img.painting_id}>
                <StyledImage src={img.image_url} alt={img.title} />
                <ImageTitleText variant="body2">{img.title}</ImageTitleText>
                <RemoveButtonContainer>
                  <Button
                    onClick={(e) => handleRemove(img.painting_id, e)}
                    color="error"
                    startIcon={<Delete />}
                    fullWidth
                    variant="outlined"
                  >
                    Remove
                  </Button>
                </RemoveButtonContainer>
              </StyledImageListItem>
            ))}
          </StyledImageList>

          <DialogSectionTitle variant="h6">
            Add New Paintings to Exhibition
          </DialogSectionTitle>
          <StyledImageList cols={3}>
            {availablePaintings.map((img) => (
              <StyledImageListItem key={img.painting_id}>
                <StyledImage src={img.image_url} alt={img.title} />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedToAdd.includes(img.painting_id)}
                      onChange={() => handleToggleSelect(img.painting_id)}
                    />
                  }
                  labelPlacement="bottom"
                  label={<Typography variant="caption">{img.title}</Typography>}
                  sx={{ width: "100%", justifyContent: "center" }}
                />
              </StyledImageListItem>
            ))}
          </StyledImageList>
        </StyledDialogContent>
        <DialogActionsStyled>
          <Button onClick={handleCloseManageDialog}>Close</Button>
          <Button
            onClick={handleAddSelected}
            variant="contained"
            color="primary"
            disabled={selectedToAdd.length === 0}
          >
            Add Selected
          </Button>
        </DialogActionsStyled>
      </ManageDialog>

      <Snackbar
        open={!!actionMessage}
        autoHideDuration={5000}
        onClose={clearMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <StyledMuiAlert
          onClose={clearMessage}
          severity={actionMessageType || "info"}
        >
          {actionMessage}
        </StyledMuiAlert>
      </Snackbar>
    </CarouselContainer>
  );
};

export default ExhibitionCarousel;
