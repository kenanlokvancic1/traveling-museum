import React, { useState, useEffect } from "react";
import { Typography, Box, Button, Grid, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer.jsx";
import ArtworkCard from "../../components/Gallery/ArtworkCard/ArtworkCard.jsx";
import {
  Root,
  PageContainer,
  PageHeader,
  PageTitle,
  PageSubtitle,
  NoFavourites,
  LoginButton,
  BrowseButton,
  LoadingBox,
  GridContainer,
  GridItemBox,
  ArtworkWrapper,
} from "./FavouritesPage.styles";
import { getUserFavorites } from "./favouritesHelper";

const FavouritesPage = () => {
  const [favouriteArtworks, setFavouriteArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

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
    const fetchFavorites = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const paintings = await getUserFavorites(user.user_id);
          console.log("Fetched favorite paintings:", paintings);
          setFavouriteArtworks(paintings);
        } catch (error) {
          console.error("Error fetching favorites:", error);
          const errorMessage =
            error?.response?.data?.message ||
            "Failed to load your favorites. Please try again.";
          showSnackbar(errorMessage, "error");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const handleFavoriteRemoved = (paintingId) => {
    setFavouriteArtworks((prevFavorites) =>
      prevFavorites.filter((artwork) => artwork.painting_id !== paintingId)
    );
    showSnackbar("Artwork removed from favorites", "success");
  };

  if (!user) {
    return (
      <Root>
        <PageContainer maxWidth="lg">
          <PageHeader>
            <PageTitle variant="h3">My Favourites</PageTitle>
            <PageSubtitle variant="subtitle1">
              Please log in to see your favourite artworks
            </PageSubtitle>
          </PageHeader>
          <NoFavourites>
            <Typography variant="h6">
              You need to be logged in to view your favourites.
            </Typography>
            <LoginButton
              variant="contained"
              color="primary"
              onClick={() => navigate("/login")}
            >
              Go to Login
            </LoginButton>
          </NoFavourites>
        </PageContainer>
        <Footer />
      </Root>
    );
  }

  return (
    <Root>
      <PageContainer maxWidth="lg">
        <PageHeader>
          <PageTitle variant="h3">My Favourites</PageTitle>
          <PageSubtitle variant="subtitle1">
            Your collection of favourite artworks
          </PageSubtitle>
        </PageHeader>

        {isLoading ? (
          <LoadingBox>
            <Typography>Loading your favourites...</Typography>
          </LoadingBox>
        ) : favouriteArtworks.length > 0 ? (
          <GridContainer container spacing={3}>
            {favouriteArtworks.map((artwork) => (
              <GridItemBox
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={artwork.painting_id || artwork.id}
              >
                <ArtworkWrapper>
                  <ArtworkCard
                    artwork={artwork}
                    isFavouritePage={true}
                    onFavoriteChange={handleFavoriteRemoved}
                  />
                </ArtworkWrapper>
              </GridItemBox>
            ))}
          </GridContainer>
        ) : (
          <NoFavourites>
            <Typography variant="h6">
              You haven't added any artworks to your favourites yet.
            </Typography>
            <Typography variant="body1">
              Browse the gallery and click the heart icon to add artworks to
              your favourites.
            </Typography>
            <BrowseButton
              variant="contained"
              color="primary"
              onClick={() => navigate("/gallery")}
            >
              Browse Gallery
            </BrowseButton>
          </NoFavourites>
        )}
      </PageContainer>
      <Footer />

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
    </Root>
  );
};

export default FavouritesPage;
