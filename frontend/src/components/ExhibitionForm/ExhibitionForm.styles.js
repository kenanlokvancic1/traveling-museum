import { styled } from "@mui/material/styles";
import {
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  List,
} from "@mui/material";

export const StyledContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 900,
  margin: "auto",
  backgroundColor: "#f5f5f5",
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  textAlign: "center",
  color: "#8D5524",
}));

export const StyledSection = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
}));

export const StyledColumn = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  "& input[type='date']::-webkit-calendar-picker-indicator": {
    filter: "invert(50%) grayscale(100%) brightness(50%)",
    cursor: "pointer",
  },
}));

export const StyledPaintingsList = styled(List)(({ theme }) => ({
  maxHeight: 200,
  overflowY: "auto",
  border: "1px solid #ccc",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  "&::-webkit-scrollbar": {
    width: 6,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#888",
    borderRadius: 3,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555",
  },
}));

export const ActionButtons = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  display: "flex",
  justifyContent: "space-between",
}));

export const CancelButton = styled(Button)(({ theme }) => ({
  color: theme.palette.grey[500],
  borderColor: theme.palette.grey[500],
  "&:hover": {
    borderColor: theme.palette.grey[700],
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.grey[700],
  },
}));

export const StyledSaveButton = styled(Button)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "#8D5524",
    boxShadow: "0px 4px 10px rgba(141, 85, 36, 0.5)",
  },
}));
