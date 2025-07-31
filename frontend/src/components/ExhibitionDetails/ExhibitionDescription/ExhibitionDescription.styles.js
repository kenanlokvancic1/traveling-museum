import { styled } from "@mui/material/styles";
import { Box, IconButton, Typography } from "@mui/material";

export const DescriptionContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(4),
  position: "relative",
}));

export const EditButtonSt = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: 0,
  top: 0,
  transform: "translateX(100%)",
  padding: theme.spacing(0.5),
  marginLeft: theme.spacing(1),
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
  justifyContent: "flex-start",
}));

export const ParagraphText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  whiteSpace: "pre-line",
}));
