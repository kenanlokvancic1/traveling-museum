import { styled } from "@mui/material/styles";
import { Container, Typography, Box, Divider } from "@mui/material";

export const RootBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
}));

export const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(16),
  paddingBottom: theme.spacing(6),
  flex: 1,
}));

export const PageHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  textAlign: "center",
}));

export const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(1),
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(3),
  marginTop: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
  },
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  width: "100%",
}));

export const SearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: theme.spacing(4),
}));

export const TabsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));
