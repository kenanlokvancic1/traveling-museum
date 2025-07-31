import React, { useState, useEffect } from "react";
import { Typography, Snackbar, Alert } from "@mui/material";
import { Favorite, FavoriteBorder, LocationOn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  StyledCard,
  CardImage,
  CardTitle,
  FavoriteButton,
  LocationWrapper,
  StyledCardBox,
  DescriptionText,
  StyledCardContent,
  ArtistName,
  InfoSection,
} from "./ArtworkCard.styles";
import {
  createFavorite,
  deleteFavoriteByPaintingAndUser,
  checkFavorite,
} from "../../../api/FavoriteApi";
import { getArtistById } from "../../../api/ArtistApi";

const ArtworkCard = ({
  artwork,
  isFavouritePage = false,
  onFavoriteChange,
  renderCard,
}) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [isFavorite, setIsFavorite] = useState(isFavouritePage);
  const [isChecking, setIsChecking] = useState(false);
  const [artist, setArtist] = useState(null);

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
    const checkIsFavorite = async () => {
      if (user && artwork.painting_id) {
        setIsChecking(true);
        try {
          const response = await checkFavorite(
            artwork.painting_id,
            user.user_id
          );
          setIsFavorite(response.exists);
        } catch (error) {
          console.error("Error checking favorite status:", error);
        } finally {
          setIsChecking(false);
        }
      }
    };

    if (!isFavouritePage) {
      checkIsFavorite();
    }
  }, [user, artwork.painting_id, isFavouritePage]);

  useEffect(() => {
    if (artwork.artist_id) {
      const fetchArtist = async () => {
        try {
          const artistData = await getArtistById(artwork.artist_id);
          setArtist(artistData);
        } catch (error) {
          console.error("Error fetching artist:", error);
        }
      };
      fetchArtist();
    }
  }, [artwork.artist_id]);

  const handleCardClick = () => {
    navigate(`/artworks/${artwork.painting_id}`);
  };

  const toggleFavorite = async (e) => {
    e.stopPropagation();

    if (!user) {
      navigate("/login");
      return;
    }

    const userId = user.user_id;
    if (!userId) {
      console.error("User ID is missing from user object", user);
      showSnackbar("Error: User information not found", "error");
      return;
    }

    try {
      if (isFavorite) {
        await deleteFavoriteByPaintingAndUser(artwork.painting_id, userId);
        showSnackbar("Removed from favorites", "success");
        if (isFavouritePage && onFavoriteChange) {
          onFavoriteChange(artwork.painting_id);
        }
      } else {
        const favoriteData = {
          painting_id: artwork.painting_id,
          user_id: userId,
        };
        await createFavorite(favoriteData);
        showSnackbar("Added to favorites", "success");
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to update favorites. Please try again.";
      showSnackbar(errorMessage, "error");
    }
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "No description available";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  const cardContent = (
    <StyledCard onClick={handleCardClick}>
      <StyledCardBox>
        <CardImage
          component="img"
          image={
            artwork.image_url ||
            "https://via.placeholder.com/350x250?text=Artwork"
          }
          alt={artwork.title || "Untitled"}
        />
        {user && (
          <FavoriteButton
            aria-label="add to favorites"
            onClick={toggleFavorite}
            disabled={isChecking}
            disableRipple
          >
            {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
          </FavoriteButton>
        )}
      </StyledCardBox>
      <StyledCardContent>
        <InfoSection>
          <CardTitle variant="h6">
            {truncateText(artwork.title, 50) || "Untitled"}
          </CardTitle>
          {artist && (
            <ArtistName color="text.primary">
              {truncateText(artist.name, 30) || "Unknown artist"}
            </ArtistName>
          )}
          <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
            Year: {artwork.year || "Year unknown"}
          </Typography>
          <LocationWrapper>
            <LocationOn />
            <Typography variant="body2" color="textSecondary">
              {truncateText(artwork.location, 25) || "Not Exhibited"}
            </Typography>
          </LocationWrapper>
        </InfoSection>
        <DescriptionText>
          {truncateText(artwork.description, 100)}
        </DescriptionText>
      </StyledCardContent>
    </StyledCard>
  );

  return (
    <>
      {renderCard ? renderCard(cardContent) : cardContent}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
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
    </>
  );
};

export default ArtworkCard;
