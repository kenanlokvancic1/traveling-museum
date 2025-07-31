import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const PageContainer = styled(Box)({
  display: "flex",
  height: "100vh",
  padding: "20px",
  boxSizing: "border-box",
});

export const ContentWrapper = styled(Box)({
  flex: 1,
  maxWidth: "1200px",
  width: "100%",
  margin: "80px auto 10px",
  paddingTop: "20px",
  overflow: "auto",
});
