import React from "react";
import { Rating, CardContent } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Typography } from "@mui/material";
import {
  GridCard,
  ListCard,
  CardContentWrapper,
  GridCardImage,
  ListCardImage,
  CardTitle,
  InfoItem,
  IconWrapper,
  StatusChip,
  ListContentBox,
  RatingContainer,
  ReviewText,
} from "./ExhibitionCard.styles";
import {
  formatDateRange,
  getStatusLabel,
  determineExhibitionStatus,
} from "./exhibitionCardHelper";

const ExhibitionCard = ({ exhibition, layout = "grid" }) => {
  const {
    title = "Untitled Exhibition",
    imageUrl,
    startDate,
    endDate,
    location = "Unknown Location",
    rating = 0,
    reviewCount = 0,
    status,
  } = exhibition;

  const dateRange =
    startDate && endDate
      ? formatDateRange(startDate, endDate)
      : "Dates Unavailable";

  if (layout === "list") {
    return (
      <ListCard>
        <ListCardImage component="img" src={imageUrl} alt={title} />
        <ListContentBox>
          <CardContentWrapper>
            <StatusChip
              isListView
              label={getStatusLabel(status)}
              status={status}
              size="large"
            />
            <CardTitle variant="h6">{title}</CardTitle>

            <InfoItem>
              <IconWrapper>
                <CalendarTodayIcon fontSize="small" />
              </IconWrapper>
              <Typography variant="body2">{dateRange}</Typography>
            </InfoItem>

            <InfoItem>
              <IconWrapper>
                <LocationOnIcon fontSize="small" />
              </IconWrapper>
              <Typography variant="body2">{location}</Typography>
            </InfoItem>

            <RatingContainer>
              <Rating value={rating} precision={1} readOnly size="small" />
              <ReviewText variant="body2">({reviewCount} reviews)</ReviewText>
            </RatingContainer>
          </CardContentWrapper>
        </ListContentBox>
      </ListCard>
    );
  }

  return (
    <GridCard>
      <GridCardImage component="img" src={imageUrl} alt={title} />
      <StatusChip label={getStatusLabel(status)} status={status} size="large" />
      <CardContent>
        <CardTitle variant="h6">{title}</CardTitle>

        <InfoItem>
          <IconWrapper>
            <CalendarTodayIcon fontSize="small" />
          </IconWrapper>
          <Typography variant="body2">{dateRange}</Typography>
        </InfoItem>

        <InfoItem>
          <IconWrapper>
            <LocationOnIcon fontSize="small" />
          </IconWrapper>
          <Typography variant="body2">{location}</Typography>
        </InfoItem>

        <RatingContainer>
          <Rating value={rating} precision={1} readOnly size="small" />
          <ReviewText variant="body2">({reviewCount} reviews)</ReviewText>
        </RatingContainer>
      </CardContent>
    </GridCard>
  );
};

export default ExhibitionCard;
