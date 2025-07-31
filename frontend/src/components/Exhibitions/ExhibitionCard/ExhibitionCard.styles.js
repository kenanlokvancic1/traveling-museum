import { styled } from "@mui/material/styles";
import {
  Card,
  CardMedia,
  Typography,
  Box,
  Chip,
  CardContent,
} from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 0,
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  position: "relative",
  overflow: "hidden",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

export const GridCard = styled(StyledCard)(({ theme }) => ({
  height: 350,
  margin: theme.spacing(2),
}));

export const CardContentWrapper = styled(CardContent)(({ theme }) => ({
  position: "relative",
  height: "100%",
}));

export const ListCard = styled(StyledCard)(({ theme }) => ({
  display: "flex",
  height: 200,
  width: "100%",
}));

export const GridCardImage = styled(CardMedia)(({ theme }) => ({
  height: 200,
  objectFit: "cover",
}));

export const ListCardImage = styled(CardMedia)(({ theme }) => ({
  width: 200,
  objectFit: "cover",
  [theme.breakpoints.down("sm")]: {
    width: 120,
  },
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1),
}));

export const InfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

export const IconWrapper = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  color: theme.palette.primary.main,
}));

export const StatusChip = styled(Chip)(({ status, theme, isListView }) => {
  let color;
  switch (status) {
    case "past":
      color = theme.palette.grey[500];
      break;
    case "current":
      color = theme.palette.primary.main;
      break;
    case "future":
      color = theme.palette.success.main;
      break;
    default:
      color = theme.palette.grey[500];
  }
  return {
    position: "absolute",
    top: 20,
    right: 20,

    [theme.breakpoints.down("sm")]: {
      right: isListView ? "unset" : 10,
      top: isListView ? "unset" : 10,
      bottom: 10,
      left: isListView ? 10 : "unset",
    },
    backgroundColor: color,
    color: "#fff",
    fontWeight: 500,
  };
});

export const ListContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
}));

export const RatingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: theme.spacing(1),
}));

export const ReviewText = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));
