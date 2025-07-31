"use client";

import React from "react";
import { Link } from "react-router-dom";
import {
  NavbarContainer,
  NavbarToolbar,
  LogoContainer,
  NavbarLogo,
  NavbarTitle,
  NavbarActions,
  NavbarIconButton,
  NavbarButtonLogin,
  NavbarButtonLogout,
  StyledNotifications,
  StyledAccountCircle,
  StyledLink,
  MobileMenuItem,
  MobileMenuLink,
  StyledMobileMenu,
  DesktopNavLinksWrapper,
} from "./Navbar.styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";
import { logoutUser } from "../../api/AuthApi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleMobileMenuOpen = () => setMobileMenuOpen(true);
  const handleMobileMenuClose = () => setMobileMenuOpen(false);
  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());    
      navigate("/login");   
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  
  return (
    <NavbarContainer>
      <NavbarToolbar>
        <LogoContainer>
          <Link to="/">
            <NavbarLogo src="/museum-icon.svg" alt="Museum Icon" />
          </Link>
          {!isMobile && (
            <DesktopNavLinksWrapper>
              <StyledLink to="/exhibitions">
                <NavbarTitle>Exhibitions</NavbarTitle>
              </StyledLink>
              <StyledLink to="/gallery">
                <NavbarTitle>Gallery</NavbarTitle>
              </StyledLink>
            </DesktopNavLinksWrapper>
          )}
        </LogoContainer>

        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={
                mobileMenuOpen ? handleMobileMenuClose : handleMobileMenuOpen
              }
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <StyledMobileMenu
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={mobileMenuOpen}
              onClose={handleMobileMenuClose}
            >
              <MobileMenuItem onClick={handleMobileMenuClose}>
                <MobileMenuLink to="/exhibitions">Exhibitions</MobileMenuLink>
              </MobileMenuItem>
              <MobileMenuItem onClick={handleMobileMenuClose}>
                <MobileMenuLink to="/gallery">Gallery</MobileMenuLink>
              </MobileMenuItem>
              {user ? (
                <>
                  <MobileMenuItem onClick={handleMobileMenuClose}>
                    <MobileMenuLink to="/notifications">
                      Notifications
                    </MobileMenuLink>
                  </MobileMenuItem>
                  <MobileMenuItem onClick={handleMobileMenuClose}>
                    <MobileMenuLink to="/profile">Profile</MobileMenuLink>
                  </MobileMenuItem>
                  <MobileMenuItem
                    onClick={() => {
                      handleMobileMenuClose();
                      handleLogout();
                    }}
                  >
                    Log out
                  </MobileMenuItem>
                </>
              ) : (
                <MobileMenuItem
                  onClick={() => {
                    handleMobileMenuClose();
                    window.location.href = "/login";
                  }}
                >
                  Log in
                </MobileMenuItem>
              )}
            </StyledMobileMenu>
          </>
        ) : (
          <NavbarActions>
            {user ? (
              <>
                <Link to="/profile">
                  <NavbarIconButton>
                    <StyledAccountCircle />
                  </NavbarIconButton>
                </Link>

                <NavbarButtonLogout onClick={handleLogout}>
                  Log out
                </NavbarButtonLogout>
              </>
            ) : (
              <NavbarButtonLogin
                onClick={() => (window.location.href = "/login")}
              >
                Log In
              </NavbarButtonLogin>
            )}
          </NavbarActions>
        )}
      </NavbarToolbar>
    </NavbarContainer>
  );
};

export default Navbar;
