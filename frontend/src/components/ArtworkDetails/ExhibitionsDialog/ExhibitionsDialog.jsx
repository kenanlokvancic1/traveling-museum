import React, { useState, useEffect } from "react";
import { Dialog, Typography, CircularProgress, Box, Chip } from "@mui/material";
import {
  StyledDialogTitle,
  StyledDialogContent,
  ExhibitionButtonWrapper,
  StyledExhibitionButton,
  StyledDialogActions,
  StyledCancelButton,
  CurrentExhibitionText,
  CurrentExhibitionTitle,
  LoadingBox,
  ExhibitionItemBox,
  ExhibitionDetailsBox,
  StyledChip,
} from "./ExhibitionsDialog.styles";
import {
  fetchAvailableExhibitions,
  formatExhibitionData,
} from "./exhibitionsDialogHelpers";
import {
  getCurrentExhibitions,
  addPaintingToExhibition,
  removePaintingFromExhibition,
} from "../artworkDetailsHelper";

const ExhibitionDialog = ({ open, onClose, paintingId }) => {
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentExhibitionId, setCurrentExhibitionId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open) {
      setError(null);
      setLoading(false);
    }
  }, [open]);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      if (!open || !paintingId) return;

      try {
        setLoading(true);
        setError(null);

        const [allExhibitions, currentExhibitions] = await Promise.all([
          fetchAvailableExhibitions(),
          getCurrentExhibitions(paintingId),
        ]);

        if (!mounted) return;

        const formattedExhibitions = allExhibitions.map(formatExhibitionData);
        setExhibitions(formattedExhibitions);

        if (currentExhibitions && currentExhibitions.length > 0) {
          setCurrentExhibitionId(currentExhibitions[0].exhibition_id);
        } else {
          setCurrentExhibitionId(null);
        }
      } catch (err) {
        if (mounted) {
          setError("Failed to load exhibitions. Please try again.");
          console.error("Error loading exhibitions:", err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [open, paintingId]);

  const handleExhibitionSelect = async (exhibitionId) => {
    if (loading) return;

    try {
      setLoading(true);
      setError(null);

      if (currentExhibitionId && currentExhibitionId !== exhibitionId) {
        await removePaintingFromExhibition(currentExhibitionId, paintingId);
      }

      if (exhibitionId !== currentExhibitionId) {
        await addPaintingToExhibition(exhibitionId, paintingId);
        setCurrentExhibitionId(exhibitionId);
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      onClose();
    } catch (err) {
      setError("Failed to update exhibition. Please try again.");
      console.error("Error updating exhibition:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown={loading}
      disableBackdropClick={loading}
      slotProps={{
        transition: {
          onExited: () => {
            setLoading(false);
            setError(null);
          },
        },
      }}
    >
      <StyledDialogTitle>
        Manage Exhibition
        {currentExhibitionId && (
          <CurrentExhibitionText variant="h6">
            Currently assigned to:{" "}
            <CurrentExhibitionTitle component="span">
              {exhibitions.find((e) => e.id === currentExhibitionId)?.title}
            </CurrentExhibitionTitle>
          </CurrentExhibitionText>
        )}
      </StyledDialogTitle>
      <StyledDialogContent>
        {loading ? (
          <LoadingBox>
            <CircularProgress />
          </LoadingBox>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : (
          <ExhibitionButtonWrapper>
            {exhibitions.map((exhibition) => (
              <StyledExhibitionButton
                key={exhibition.id}
                variant={
                  currentExhibitionId === exhibition.id
                    ? "contained"
                    : "outlined"
                }
                fullWidth
                onClick={() => handleExhibitionSelect(exhibition.id)}
                disabled={loading}
              >
                <ExhibitionItemBox>
                  <Typography
                    variant="subtitle1"
                    fontWeight={
                      currentExhibitionId === exhibition.id ? "bold" : "normal"
                    }
                  >
                    {exhibition.title}
                  </Typography>
                  <ExhibitionDetailsBox>
                    <Typography variant="caption" color="textSecondary">
                      {exhibition.startDate} - {exhibition.endDate}
                    </Typography>
                    {currentExhibitionId === exhibition.id && (
                      <StyledChip
                        label="Current"
                        size="small"
                        color="primary"
                      />
                    )}
                  </ExhibitionDetailsBox>
                </ExhibitionItemBox>
              </StyledExhibitionButton>
            ))}
          </ExhibitionButtonWrapper>
        )}
      </StyledDialogContent>
      <StyledDialogActions>
        <StyledCancelButton onClick={handleClose} disabled={loading}>
          Close
        </StyledCancelButton>
      </StyledDialogActions>
    </Dialog>
  );
};

export default ExhibitionDialog;
