import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const ReviewsContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const NoReviewsMessage = styled(Typography)(({ theme }) => ({
  fontStyle: "italic",
  color: theme.palette.text.secondary,
  textAlign: "center",
  padding: theme.spacing(3, 0),
}));
