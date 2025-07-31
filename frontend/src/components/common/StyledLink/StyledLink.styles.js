import { styled } from "@mui/material/styles";
import { Link } from "@mui/material";

export const CustomStyledLink = styled(Link)(({ theme }) => ({
  color: "#8B4513",
  textDecoration: "none",
  cursor: "pointer",
  marginBottom: theme.spacing(4),
  "&:hover": {
    textDecoration: "underline",
  },
}));
