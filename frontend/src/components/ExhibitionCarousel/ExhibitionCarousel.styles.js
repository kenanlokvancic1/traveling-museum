import { styled } from "@mui/material/styles";
import {
  IconButton,
  Box,
  Dialog,
  ImageListItem,
  ImageList,
  DialogContent,
  DialogTitle,
  DialogActions,
  Typography,
  Alert,
} from "@mui/material";

export const CarouselContainer = styled("div")({
  width: "100%",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  padding: "20px 0",
});

export const CardsTrack = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  transition: "transform 0.3s ease",
  padding: 0,
  margin: "0 20px",
  width: "100%",
}));

export const CardContainer = styled(Box)(({ theme }) => ({
  flex: "0 0 auto",
  width: 350,
  height: 400,
  position: "relative",
  borderRadius: 0,
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  transition: "transform 0.3s ease",
  backgroundColor: "#fff",

  "&:hover": {
    transform: "scale(1.02)",
  },
}));

export const CarouselImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  cursor: "pointer",
});

export const NavButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  color: "#000",
  zIndex: 1,
  transition: "all 0.3s ease",

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
}));

export const AddButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  padding: theme.spacing(1),

  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },

  "& .MuiSvgIcon-root": {
    fontSize: "2rem",
  },
}));

export const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    backgroundColor: "transparent",
    boxShadow: "none",
    maxWidth: "90vw",
    maxHeight: "90vh",
  },
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(2px)",
  },
});

export const DialogImage = styled("img")({
  maxWidth: "90vw",
  maxHeight: "90vh",
  objectFit: "contain",
  borderRadius: "4px",
});

export const StyledImageListItem = styled(ImageListItem)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "0.75rem",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.5rem",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  overflow: "visible",
  gap: "0.5rem",
  height: "100%",
  justifyContent: "space-between",
}));

export const StyledImage = styled("img")({
  width: "100%",
  height: "12.5rem",
  objectFit: "cover",
  borderRadius: "0.25rem",
});

export const StyledImageList = styled(ImageList)({
  width: "100%",
  height: "auto",
  gap: "16px !important",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr)) !important",
  "& .MuiImageListItem-root": {},
});

export const StyledDialogContent = styled(DialogContent)({
  padding: "24px",
});

export const StyledBox = styled(Box)({
  width: "100%",
  position: "relative",
});

export const StyledNavButtonLeft = styled(NavButton)({
  left: 0,
});

export const StyledNavButtonRight = styled(NavButton)({
  right: 0,
});

export const ManageDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    maxWidth: "800px",
    width: "100%",
  },
});

export const DialogTitleStyled = styled(DialogTitle)({
  fontWeight: "bold",
});

export const DialogActionsStyled = styled(DialogActions)({
  padding: "16px 24px",
});

export const ErrorMessageText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const ImageTitleText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  textAlign: "center",
}));

export const RemoveButtonContainer = styled(Box)({
  marginTop: "auto",
  width: "100%",
});

export const DialogSectionTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

export const StyledMuiAlert = styled(Alert)({
  width: "100%",
});
