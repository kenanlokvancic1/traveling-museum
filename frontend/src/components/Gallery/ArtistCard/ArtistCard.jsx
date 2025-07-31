import React from "react";
import { CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  StyledCard,
  CardImage,
  CardTitle,
  BioText,
} from "./ArtistCard.styles";

const ArtistCard = ({ artist, renderCard }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/artists/${artist.artist_id}`);
  };

  const shortenedBio = artist.biography
    ? artist.biography.substring(0, 100) + "..."
    : "No biography available";

  const cardContent = (
    <StyledCard onClick={handleCardClick} sx={{ cursor: "pointer" }}>
      <CardImage
        component="img"
        image={
          artist.image_url || "https://via.placeholder.com/350x250?text=Artist"
        }
        alt={artist.name}
      />
      <CardContent>
        <CardTitle variant="h6">{artist.name}</CardTitle>
        <Typography variant="body2" color="textSecondary">
          {artist.birth_year} - {artist.death_year || "Present"}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {artist.nationality || "Nationality Unknown"}
        </Typography>
        <BioText color="text.secondary">{shortenedBio}</BioText>
      </CardContent>
    </StyledCard>
  );

  return renderCard ? renderCard(cardContent) : cardContent;
};

export default ArtistCard;
