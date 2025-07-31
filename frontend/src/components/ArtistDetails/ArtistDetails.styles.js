import { styled } from "@mui/material/styles";
import { Box, Typography, IconButton, TextField } from "@mui/material";

export const StyledContainer = styled(Box)(({ theme }) => ({
  maxWidth: "1200px",
  margin: "0 auto",
  padding: theme.spacing(4),
  backgroundColor: "#F8F8F8",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  border: "2px solid #8D5524",
}));

export const TopSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

export const ActionsBar = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

export const CuratorActionButtons = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
}));

export const ArtistContentLayout = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(4),
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
  marginTop: theme.spacing(3),
}));

export const ArtistImageContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
  },
}));

export const StyledImage = styled("img")(({ theme }) => ({
  width: "100%",
  maxWidth: "500px",
  height: "auto",
  borderRadius: "8px",
  objectFit: "cover",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
}));

export const InfoWrapper = styled(Box)(({ theme }) => ({
  flex: 2,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const StyledDetails = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
}));

export const StyledEditField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiInputBase-root": {
    backgroundColor: "#FFFFFF",
    minHeight: "150px",
    alignItems: "flex-start",
  },
  "& .MuiInputBase-input": {
    color: theme.palette.grey[800],
    fontFamily: theme.typography.fontFamily,
    fontSize: "1rem",
    lineHeight: 1.5,
    resize: "vertical",
  },
  "& .MuiOutlinedInput-root": {
    "&:focus-within .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export const DatesText = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[700],
  marginBottom: theme.spacing(2),
  fontWeight: 500,
}));

export const BioText = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[800],
  lineHeight: 1.6,
  whiteSpace: "pre-wrap",
}));

export const StyledFavoriteIcon = styled(IconButton)(({ isFavorite }) => ({
  color: isFavorite ? "#ff4081" : "inherit",
  "&:hover": {
    color: "#ff4081",
  },
}));
