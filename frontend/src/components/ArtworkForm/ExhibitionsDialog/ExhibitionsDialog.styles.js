import { styled } from "@mui/material/styles";
import {
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
} from "@mui/material";

export const StyledDialogTitle = styled(DialogTitle)({
  fontSize: "18px",
  fontWeight: "bold",
  color: "#8D5524",
  textAlign: "center",
  padding: "10px 0",
});

export const StyledDialogContent = styled(DialogContent)({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  paddingRight: "10px",
  maxHeight: "300px",
  overflowY: "auto",

  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f0f0f0",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#C4A484",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#8D5524",
  },
});

export const ExhibitionButtonWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  paddingRight: "10px",
});

export const StyledExhibitionButton = styled(Button)({
  borderColor: "#8D5524",
  transition: "all 0.3s ease",
  boxShadow: "none",
  "&:hover": {
    borderColor: "#8D5524",
    backgroundColor: "#F1EBDE",
    boxShadow: "0px 4px 10px rgba(141, 85, 36, 0.5)",
  },
});

export const StyledDialogActions = styled(DialogActions)({
  display: "flex",
  justifyContent: "flex-end",
  padding: "12px",
});

export const StyledCancelButton = styled(Button)({
  borderColor: "#8D5524",
  color: "#8D5524",
  minWidth: "auto",
  padding: "6px 12px",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "transparent",
    textDecoration: "underline",
    textDecorationColor: "#8D5524",
  },
});
