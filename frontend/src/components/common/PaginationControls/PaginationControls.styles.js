import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const PaginationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
}));
