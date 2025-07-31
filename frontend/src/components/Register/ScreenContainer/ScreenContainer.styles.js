import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const StyledScreenContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
}));
