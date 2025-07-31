import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { textAlign } from "@mui/system";

export const StyledTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(8),
  fontSize: "2.1rem",
  fontWeight: 600,
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
    marginBottom: theme.spacing(5),
    fontSize: "30px",
  },
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
    marginBottom: theme.spacing(3),
    fontSize: "30px",
  },
}));
