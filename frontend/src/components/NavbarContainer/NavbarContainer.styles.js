import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const drawerWidth = 240;
const collapsedWidth = 56; 

export const PageContainer = styled(Box)(({ isCurator }) => ({
  display: "flex",
  height: "100vh",
}));

export const ContentWrapper = styled(Box)(({ isCurator, sidebarOpen }) => ({
  flexGrow: 1,
  overflow: "auto",
  transition: "all 0.3s ease-in-out",
  marginLeft: isCurator ? (sidebarOpen ? `${drawerWidth}px` : `${collapsedWidth}px`) : "0px",
  marginRight: isCurator ? "0px" : "auto",
  width: isCurator ? `calc(100% - ${sidebarOpen ? drawerWidth : collapsedWidth}px)` : "100%",
}));
