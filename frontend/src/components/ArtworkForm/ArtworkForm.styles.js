import { styled } from "@mui/material/styles";
import { Paper, Typography, Box, Button } from "@mui/material";

export const StyledContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 900,
  margin: "auto",
  backgroundColor: "#f5f5f5",
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  textAlign: "center",
  color: "#8D5524",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(1),
}));

export const StyledSection = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
}));

export const StyledColumn = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const StyledUploadBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "120px",
});

export const StyledUploadButton = styled(Button)(({ theme }) => ({
  color: "#8D5524",
  borderColor: "#8D5524",
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: "#8D5524",
    color: "white",
    boxShadow: "0px 4px 10px rgba(141, 85, 36, 0.5)",
  },
}));

export const StyledSaveButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  backgroundColor: "#8D5524",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#6E4B32",
    boxShadow: "0px 4px 10px rgba(141, 85, 36, 0.5)",
  },
}));

export const ImageBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: theme.spacing(2),
  height: 400,
  width: "100%",
  border: "2px dashed #8D5524",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#F1EBDE",
}));

export const ConditionReportBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginTop: theme.spacing(2),
}));