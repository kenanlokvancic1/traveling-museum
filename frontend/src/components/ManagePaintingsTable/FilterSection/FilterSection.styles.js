import { styled } from "@mui/material/styles";
import { Box, TextField, Typography, Select, MenuItem } from "@mui/material";

export const StyledFilterContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(1),
  position: "sticky",
  top: 0,
  background: "white",
  marginBottom: "50px",
  zIndex: 1000,
}));

export const StyledDropdownContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  width: "40%",
}));

export const StyledSearchInput = styled(TextField)(({ theme }) => ({
  marginTop: "20px",
  width: "600px",
  borderRadius: "20px",
  "& .MuiInputBase-input": {
    color: "#8D5524",
  },
}));

export const StyledStatusFilter = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  justifyContent: "center",
}));

export const StyledStatusOption = styled(Typography)(({ theme, active }) => ({
  cursor: "pointer",
  fontWeight: active ? "bold" : "normal",
  borderBottom: active ? `2px solid #8D5524` : "none",
  paddingBottom: theme.spacing(0.5),
  transition: "0.3s",
  color: "#8D5524",
  "&:hover": {
    color: "#8D5524",
  },
}));
