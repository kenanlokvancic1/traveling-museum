import { styled } from "@mui/material/styles";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MuiDrawer from "@mui/material/Drawer";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

export const SidebarContainer = styled(Box)({
  display: "flex",
  minHeight: "100vh",
});

export const SidebarMenu = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: open ? drawerWidth : theme.spacing(7) + 1,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  zIndex: 2,
  "& .MuiDrawer-paper": {
    width: open ? drawerWidth : theme.spacing(7) + 1,
    backgroundColor: "#F1EBDE",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  },
}));

export const SidebarToggleButton = styled(IconButton)(({ open }) => ({
  position: "absolute",
  top: "20px",
  left: open ? "50%" : "20px",
  transform: open ? "translateX(-50%)" : "none",
  backgroundColor: open ? "#C7BFAB" : "transparent",
  transition: "all 0.3s ease",
  boxShadow: open ? "0 4px 8px rgba(141, 85, 36, 0.6)" : "none",
  "&:hover": {
    backgroundColor: open ? "#8D5524" : "#C7BFAB",
  },
}));

export const SidebarMenuIcon = styled(MenuIcon)(({ open }) => ({
  width: 30,
  height: 30,
  transition: "transform 0.3s, color 0.3s",
  color: "gray",
  "&:hover": {
    color: open ? "white" : "gray",
  },
}));

export const SidebarList = styled(List)({
  marginTop: 80,
  width: "100%",
});

export const SidebarItem = styled(ListItem)({
  padding: "12px 20px",
  margin: "8px 0",
  backgroundColor: "transparent",
  borderRadius: 2,
  display: "flex",
  alignItems: "center",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#C7BFAB",
    color: "#8D5524",
    transform: "scale(1.05)",
  },
});

export const SidebarItemIcon = styled(ListItemIcon)(({ open }) => ({
  minWidth: 40,
  transition: "transform 0.5s",
  paddingLeft: open ? 0 : "10px",
  "&:hover": {
    transform: "scale(1.4)",
  },
}));

export const SidebarItemText = styled(ListItemText)(({ open }) => ({
  fontSize: "16px",
  fontWeight: 500,
  color: "#000",
  display: open ? "block" : "none",
}));

export const MainContent = styled(Box)(({ theme, open }) => ({
  flexGrow: 1,
  marginLeft: open ? `${drawerWidth - 56}px` : theme.spacing(2),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

export const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
  width: "100%",
  "&.active": {
    fontWeight: "bold",
    color: "#8D5524",
    "& .MuiListItem-root": {
      backgroundColor: "#C7BFAB",
      transform: "scale(1.05)",
      boxShadow: "0 2px 4px rgba(141, 85, 36, 0.2)",
    },
    "& .MuiListItemIcon-root": {
      color: "#8D5524",
    },
  },
}));
