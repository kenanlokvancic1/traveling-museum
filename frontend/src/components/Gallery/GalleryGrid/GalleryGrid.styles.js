import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export const GridContainer = styled(Box)(({ theme, gridTemplateColumns }) => ({
  display: "grid",
  gap: theme.spacing(2),
  gridTemplateColumns: gridTemplateColumns.xs,
  width: "100%",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: gridTemplateColumns.sm,
    placeItems: "center",
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: gridTemplateColumns.md,
  },
}));

export const GridItem = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "250px",
});

export const ListContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(4),
}));

export const ListLayout = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
});

export const CardLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
  width: "250px",
  display: "block",
}));

export const NoResultsMessage = styled(Box)(({ theme }) => ({
  textAlign: "center",
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));
