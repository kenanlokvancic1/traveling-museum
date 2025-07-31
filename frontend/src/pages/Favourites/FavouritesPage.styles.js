import { Box, Container, Typography, Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Root = styled(Box)({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

export const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(20),
  paddingBottom: theme.spacing(6),
  flex: 1,
  [theme.breakpoints.down("sm")]: {
    paddingTop: theme.spacing(16),
  },
}));

export const PageHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  textAlign: "center",
}));

export const PageTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const PageSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const NoFavourites = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
}));

export const LoginButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const BrowseButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const LoadingBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  textAlign: "center",
}));

export const GridContainer = styled(Grid)(({ theme }) => ({
  justifyContent: "center",
  marginTop: theme.spacing(2),
  width: "100%",
}));

export const GridItemBox = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));

export const ArtworkWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  maxWidth: "280px",
  margin: "0 auto",
  justifyContent: "center",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "250px",
  },
}));
