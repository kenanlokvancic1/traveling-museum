import { styled } from "@mui/material/styles";
import {
  Card,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  CardContent as MuiCardContent,
} from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
  width: "250px",
  height: "450px",
  margin: theme.spacing(1),
  borderRadius: 0,
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  position: "relative",
  overflow: "hidden",
  transition: "transform 0.3s ease",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

export const CardImage = styled(CardMedia)(({ theme }) => ({
  width: "250px",
  height: "250px",
  objectFit: "cover",
  flexShrink: 0,
}));

export const StyledCardContent = styled(MuiCardContent)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(1.5),
  "&:last-child": {
    paddingBottom: theme.spacing(1.5),
  },
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(0.5),
  fontSize: "1rem",
  lineHeight: 1.2,
  height: "2.4rem",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
}));

export const ArtistName = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  marginBottom: theme.spacing(0.5),
}));

export const InfoSection = styled(Box)(({ theme }) => ({
  marginBottom: "auto",
}));

export const TagsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

export const StyledChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: 4,
  fontSize: "0.7rem",
}));

export const FavoriteButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
}));

export const LocationWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
  marginBottom: theme.spacing(0.5),
  "& .MuiSvgIcon-root": {
    fontSize: "1rem",
  },
}));

export const StyledCardBox = styled(Box)({
  position: "relative",
});

export const DescriptionText = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  lineHeight: 1.4,
  height: "2.5rem",
  marginTop: "auto",
  color: theme.palette.text.secondary,
  whiteSpace: "pre-line",
}));
