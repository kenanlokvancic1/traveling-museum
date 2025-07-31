import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const StyledLeftPanel = styled(Box)(({ theme }) => ({
  flex: 2,
  padding: theme.spacing(10),
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(6),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(4),
    flex: 1,
  },
}));
