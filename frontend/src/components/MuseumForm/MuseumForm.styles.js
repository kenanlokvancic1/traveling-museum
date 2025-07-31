import { styled } from "@mui/material/styles";
import { Paper, Typography, Box, Button, Container } from "@mui/material";

export const StyledFormContainer = styled(Container)({
  paddingTop: "100px",
  paddingBottom: "48px",
});

export const StyledFormWrapper = styled(Box)({
  width: "100%",
  paddingTop: "24px",
  paddingBottom: "24px",
});

export const StyledForm = styled(Box)({
  marginTop: "16px",
});

export const StyledContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 900,
  margin: "auto",
  marginTop: theme.spacing(16),
  backgroundColor: "#f5f5f5",
}));

export const StyledTitle = styled(Typography)({
  marginBottom: "24px",
  textAlign: "center",
  color: "#8D5524",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
});

export const StyledSection = styled(Box)({
  display: "flex",
  gap: "24px",
});

export const StyledColumn = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const StyledSaveButton = styled(Button)({
  marginTop: "24px",
  backgroundColor: "#8D5524",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#6E4B32",
  },
});

export const StyledBackButton = styled(Button)({
  marginTop: "16px",
});
