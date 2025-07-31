import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const StyledButton = styled(Button)(({ theme, isMobile }) => ({
  minWidth: isMobile ? 40 : 150,
  borderRadius: 8,
  height: "100%",
  padding: isMobile ? theme.spacing(1) : undefined,
  width: isMobile ? 40 : undefined,
  transition: "all 0.3s ease",

  "&:hover": {
    backgroundColor: "#F1EBDE",
  },

  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(1),
    minWidth: 40,
    width: 40,
    height: 40,
    padding: theme.spacing(1),
    "& .MuiButton-startIcon": {
      margin: 0,
    },
  },
}));
