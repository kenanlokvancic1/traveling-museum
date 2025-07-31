import { styled } from "@mui/material/styles";
import { FormControl } from "@mui/material";

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 150,
  "& .MuiOutlinedInput-root": {
    borderRadius: 0,
  },
}));
