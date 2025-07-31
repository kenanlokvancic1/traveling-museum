import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";

export const PageContainer = styled(Box)({
  display: "flex",
  height: "100vh",
});

export const ContentContainer = styled(Box)({
  flex: 1,
  marginTop: "80px",
  padding: "40px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  overflowY: "auto",
});

export const AddButton = styled(Button)({
  alignSelf: "center",
  marginTop: "20px",
  backgroundColor: "#8D5524",
  color: "white",
  "&:hover": {
    backgroundColor: "#A66D3A",
    boxShadow: "0 8px 12px rgba(166, 109, 58, 0.4), 0 2px 4px rgba(166, 109, 58, 0.3)",
  },
  "@media (max-width: 600px)": {
    width: "100%",
  },
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  padding: "12px 24px",
  borderRadius: "30px",
  fontSize: "18px",
  fontWeight: "bold",
  transition: "all 0.3s ease",
});


