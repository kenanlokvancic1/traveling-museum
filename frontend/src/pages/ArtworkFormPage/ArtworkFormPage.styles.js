import { styled } from "@mui/material/styles";
import { Container, Typography, Box } from "@mui/material";

export const PageContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

export const ContentContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(0),
  paddingTop: theme.spacing(13),
}));

export const FormWrapper = styled(Box)(({ theme }) => ({
  maxWidth: 900,
  margin: "auto",
}));




