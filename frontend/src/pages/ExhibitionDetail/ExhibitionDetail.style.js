import { styled } from "@mui/material/styles";
import { Container, Box } from "@mui/material";

export const PageWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

export const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(16),
  paddingBottom: theme.spacing(6),
  flex: 1,
}));

export const ContentSection = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: 800,
  margin: "0 auto",
}));

export const ModeToggleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));
