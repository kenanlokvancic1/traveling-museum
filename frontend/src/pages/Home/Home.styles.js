import { Box, Typography, Divider, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

export const HomePageContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minHeight: "100vh",
  backgroundColor: "#C7BFAB",
});

export const CarouselContainer = styled(Box)({
  width: "100%",
  height: "90vh",
  overflow: "hidden",
  position: "relative",
  paddingBottom: "10vh",
});

export const ExhibitionsSection = styled(Box)(({ theme }) => ({
  paddingTop: "80px",
  paddingBottom: "60px",
  width: "100%",
  minHeight: `calc(100vh - 90px)`,
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  [theme.breakpoints.down("sm")]: {
    paddingTop: "5px",
    paddingBottom: "10px",
  },
}));

export const ExhibitionsTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginTop: "120px",
  marginBottom: "60px",
  color: "#3D1F0E",
  fontSize: "2.5rem",

  [theme.breakpoints.down("sm")]: {
    fontSize: "1.6rem",
    marginTop: "20px",
    marginBottom: "10px",
  },
}));

export const CardGridContainer = styled(Box)(({ theme }) => ({
  width: "95%",
  maxWidth: "1400px",
  margin: "0 auto",
  position: "relative",

  [theme.breakpoints.down("sm")]: {
    position: "static",
    transform: "none",
    top: "unset",
    left: "unset",
  },
}));

export const CardGrid = styled(Grid)({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "16px",
});

export const StyledGridItem = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "center",
  "& a": {
    width: "100%",
    maxWidth: "300px",
    textDecoration: "none",
  },
}));

export const AboutSectionDivider = styled(Divider)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(5),
  backgroundColor: "#3D1F0E",
}));

export const MobileCarouselWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  overflow: "hidden",
  position: "relative",
  paddingBottom: theme.spacing(1),
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

export const MobileCarouselScrollBox = styled(Box)({
  display: "flex",
  overflowX: "auto",
  scrollSnapType: "x mandatory",
  WebkitOverflowScrolling: "touch",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  px: 1,
  gap: 16,

  "&::-webkit-scrollbar": {
    display: "none",
  },
});

export const MobileCarouselItem = styled(Box)({
  flex: "0 0 80%",
  scrollSnapAlign: "start",
  scrollBehavior: "smooth",
});
