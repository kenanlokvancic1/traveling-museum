import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";


export const PageContainer = styled(Box)(({ theme }) => ({
 width: "100%",
 backgroundColor: "#f9f9f9",
 minHeight: "100vh",
 [theme.breakpoints.down("sm")]: {
   paddingTop: "56px",
 },
}));
