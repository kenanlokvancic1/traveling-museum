import { styled } from "@mui/material/styles";
import { Box, Paper, IconButton } from "@mui/material";

export const ModalOverlay = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1300,
}));

export const ModalContainer = styled(Paper)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  minWidth: 350,
  maxWidth: 500,
  maxHeight: "90vh",
  overflow: "auto",
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 8,
  right: 8,
}));
