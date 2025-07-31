import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

export const StyledSearchBar = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  width: "100%",
  maxWidth: 350,
  "& .MuiOutlinedInput-root": {
    borderRadius: 0,
  },
}));
