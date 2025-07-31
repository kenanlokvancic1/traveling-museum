import { styled } from "@mui/material/styles";
import { Box, IconButton, TextField } from "@mui/material";

export const InfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  marginBottom: theme.spacing(2),
  position: "relative",
}));

export const IconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.palette.primary.main,
  marginRight: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

export const EditButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(5),
  padding: 4,
}));

export const EditContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  flex: 1,
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
}));

export const DateFieldContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  flex: 1,
}));

export const StyledDateField = styled(TextField)(({ theme }) => ({
  flex: 1,
  "& .MuiInputBase-input::-webkit-calendar-picker-indicator": {
    filter:
      "invert(100%) sepia(0%) saturate(7500%) hue-rotate(86deg) brightness(99%) contrast(114%)",
  },
}));
