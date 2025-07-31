import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const CustomStyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#8B4513",
  color: "#fff",
  fontSize: "1rem",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#7A3F10",
  },
}));
