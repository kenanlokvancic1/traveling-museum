import { styled } from "@mui/material/styles";
import { Card, CardMedia, Typography } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
  width: "250px",
  height: 420,
  margin: theme.spacing(1),
  borderRadius: 0,
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  position: "relative",
  overflow: "hidden",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

export const CardImage = styled(CardMedia)(({ theme }) => ({
  width: "250px",
  height: "250px",
  objectFit: "cover",
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1),
}));

export const SpecialtyText = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
  fontStyle: "italic",
  marginBottom: theme.spacing(1),
}));

export const BioText = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
}));
