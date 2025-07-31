import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const PageContainer = styled(Box)({
  display: "flex",
  height: "100vh",
  alignContent: "center",
});

export const ContentContainer = styled(Box)({
  flex: 1,
  marginTop: "140px",
  paddingRight: "120px",
  paddingLeft: "120px",
  paddingBottom: "40px",
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  overflowY: "auto",
});
