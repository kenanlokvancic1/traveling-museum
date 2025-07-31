import { styled } from "@mui/material/styles";
import { AppBar, Toolbar, Box, Button, IconButton } from "@mui/material";
import { Notifications, AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const NavbarContainer = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "isSidebarOpen",
})(({ theme, isSidebarOpen }) => ({
  backgroundColor: "#C7BFAB",
  boxShadow: 4,
  height: "90px",
  display: "flex",
  justifyContent: "center",
  position: "fixed",
  top: 0,
  left: isSidebarOpen ? "240px" : "80px",
  width: `calc(100% - ${isSidebarOpen ? "240px" : "80px"})`,
  transition: "left 0.3s ease, width 0.3s ease",
  zIndex: 10,
  height: "90px",
}));

export const NavbarToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 16px",
});

export const LogoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginLeft: "16px",
  gap: "20px",
});

export const NavbarLogo = styled("img")({
  width: "56px",
  height: "56px",
  cursor: "pointer",
  transition:
    "transform 0.3s ease-in-out, filter 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  WebkitMaskImage: "url('/museum-icon.svg')",
  maskImage: "url('/museum-icon.svg')",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  backgroundColor: "#4B2A14",
  "&:hover": {
    transform: "scale(1.1)",
    filter: "brightness(1.2)",
    boxShadow: "0px 6px 18px rgba(75, 42, 20, 0.8)",
  },
});

export const StyledLink = styled(Link)({
  textDecoration: "none",
});

export const NavbarTitle = styled("div")({
  fontWeight: 400,
  fontSize: "20px",
  letterSpacing: "1px",
  color: "#3D1F0E",
  padding: "8px 16px",
  borderRadius: "12px",
  transition: "all 0.3s ease-in-out",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
    height: "2px",
    backgroundColor: "#8D5524",
    opacity: 0,
    transition: "opacity 0.3s ease-in-out",
  },
  "&:hover": {
    color: "#8D5524",
    "&::after": {
      opacity: 1,
    },
  },
});

export const NavbarActions = styled(Box)({
  display: "flex",
  alignItems: "center",
});

export const NavbarIconButton = styled(IconButton)({
  margin: "0 8px",
  fontSize: "36px",
  color: "#3D2B1F",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.1)",
    boxShadow: "0px 4px 10px rgba(75, 42, 20, 0.8)",
  },
});

export const StyledNotifications = styled(Notifications)({
  fontSize: "36px",
});

export const StyledAccountCircle = styled(AccountCircle)({
  fontSize: "36px",
});

export const NavbarButton = styled(Button)(({ user }) => ({
  marginLeft: "16px",
  fontSize: "18px",
  fontWeight: "bold",
  padding: "6px 8px",
  borderRadius: "8px",
  color: "#8D5524",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "2px",
    left: "0",
    width: "100%",
    height: "2px",
    backgroundColor: "#8D5524",
    opacity: 0,
    transition: "opacity 0.3s ease-in-out",
  },
  "&:hover": {
    color: "#8D5524",
    "&::after": {
      opacity: 1,
    },
  },
}));
