import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

export const CustomStyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(5),
}));
