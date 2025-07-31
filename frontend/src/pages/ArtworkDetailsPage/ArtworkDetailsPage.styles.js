import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";


export const PageContainer = styled(Box)({
  padding: "20px",
  backgroundColor: "#F5F5F5",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: "calc(100vh - 160px)",
});

export const ContentWrapper = styled(Box)(({ isCurator }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  maxWidth: "1200px",
  width: "100%",
  marginTop: "90px",
}));

export const TitleWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "20px",
});

export const TitleText = styled(Typography)({
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#8D5524",
});

export const SubTitleText = styled(Typography)({
  fontSize: "1.2rem",
  color: "#5A3E1B",
});

export const MessageContainer = styled(Box)({
  padding: "24px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "200px",
  width: "100%",
  marginTop: "90px",
});

export const MessageText = styled(Typography)({
  fontSize: "1.2rem",
  color: "#666",
  textAlign: "center",
});

export const FooterWrapper = styled(Box)({
  marginTop: "20px",
  width: "100%",
});