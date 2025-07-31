import { styled } from "@mui/material/styles";
import { Box, TextField, FormControl, InputAdornment } from "@mui/material";

export const SearchIconAdornment = styled(InputAdornment)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const FilterContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-center",
  alignItems: "flex-end",
  flexWrap: "wrap",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  border: "1px solid #ccc",
  backgroundColor: "#fff",
  marginBottom: theme.spacing(4),
  position: "sticky",
  top: 0,
  zIndex: 1000,
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

export const SearchTextField = styled(TextField)(({ theme }) => ({
  minWidth: 220,
  alignSelf: "flex-end",
  marginBottom: 0,
  "& .MuiInputBase-root": {
    height: "40px",
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

export const FilterFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 180,
  alignSelf: "flex-end",
  marginBottom: 0,
}));

export const RightAlignedBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-end",
}));
