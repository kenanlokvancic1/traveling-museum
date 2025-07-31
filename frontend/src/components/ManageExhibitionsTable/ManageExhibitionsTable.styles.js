import { styled } from "@mui/material/styles";
import { TableContainer, TableCell, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: "1200px",
  overflowY: "hidden",
  paddingTop: "40px",
  paddingBottom: "40px",
  paddingLeft: "40px",
  paddingRight: "40px",
}));

export const StyledTableHeader = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#8D5524",
  color: "#FFFFFF",
  fontWeight: "bold",
  padding: theme.spacing(2),
  position: "sticky",
  top: 0,
  zIndex: 1000,
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  color: "#8D5524",
  textDecoration: "underline",
  "&:hover": {
    fontWeight: "bold",
  },
}));

export const ResetButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: theme.spacing(3),
}));
