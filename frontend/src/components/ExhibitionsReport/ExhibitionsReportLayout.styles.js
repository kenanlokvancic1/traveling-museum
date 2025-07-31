import { styled } from "@mui/material/styles";
import { Container, Paper, Box, Typography, Alert } from "@mui/material";

const SPACING = {
  CONTAINER: {
    GAP: 3,
    TOP: 15,   
    BOTTOM: 5   
  },
  COMPONENT: {
    PADDING: 2,
    MARGIN: 2
  },
  SECTION: {
    GAP: 4
  }
};

export const ReportContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(SPACING.CONTAINER.GAP),
  paddingTop: theme.spacing(SPACING.CONTAINER.TOP),
  paddingBottom: theme.spacing(SPACING.CONTAINER.BOTTOM),
}));

export const ReportTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(SPACING.COMPONENT.MARGIN),
  color: theme.palette.brown?.main || "#8D5524",
  fontWeight: theme.typography.fontWeightBold,
}));

export const FilterContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(SPACING.COMPONENT.PADDING),
  borderRadius: theme.shape.borderRadius,
}));

export const TableWrapper = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  marginBottom: theme.spacing(SPACING.SECTION.GAP),
}));

export const ChartsContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(SPACING.SECTION.GAP),
  gridTemplateColumns: "repeat(2, 1fr)",
  width: "100%",
  padding: theme.spacing(SPACING.COMPONENT.PADDING),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  }
}));

export const ChartWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(SPACING.COMPONENT.PADDING),
  height: theme.spacing(40),  
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
}));

export const LoaderWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: theme.spacing(SPACING.SECTION.GAP),
}));

export const ErrorAlert = styled(Alert)(({ theme }) => ({
  marginTop: theme.spacing(SPACING.COMPONENT.MARGIN),
  marginBottom: theme.spacing(SPACING.COMPONENT.MARGIN),
}));
