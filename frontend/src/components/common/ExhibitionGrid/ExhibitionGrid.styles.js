import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export const GridContainer = styled(Box)(({ theme, gridTemplateColumns }) => ({
  display: "grid",
  gap: theme.spacing(3),
  gridTemplateColumns: gridTemplateColumns.xs,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: gridTemplateColumns.sm,
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: gridTemplateColumns.md,
  },
}));

export const GridItem = styled(Box)({
  width: "100%",
});

export const ListContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

export const ListLayout = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: theme.spacing(4),
}));

export const ListItem = styled(Box)(({ theme }) => ({
  width: "100%",
  "&:not(:last-child)": {
    marginBottom: theme.spacing(4),
  },
}));

export const CardLink = styled(Link)(({ theme, layout }) => ({
  textDecoration: "none",
  color: "inherit",
  display: "block",
  width: "100%",
  height: "100%",
  "& > *": {
    width: "100%",
    height: "100%",
    margin: "0 !important",
  },
}));

export const NoResultsMessage = styled(Box)(({ theme }) => ({
  textAlign: "center",
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));
