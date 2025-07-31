"use client";

import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/userSlice";
import {
  NavbarContainer,
  NavbarToolbar,
  LogoContainer,
  NavbarLogo,
  NavbarTitle,
  NavbarActions,
  NavbarIconButton,
  NavbarButton,
  StyledNotifications,
  StyledAccountCircle,
  StyledLink,
} from "./DynamicNavbar.styles";
import Badge from "@mui/material/Badge";
import { useNotifications } from "../../../contexts/NotificationsContext";
import { logoutUser } from "../../../api/AuthApi";
import { useNavigate } from "react-router-dom";

const DynamicNavbar = ({ isSidebarOpen }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuth = async () => {
    if (user) {
      try {
        await logoutUser();     
        dispatch(logout());   
        navigate("/login"); 
      } catch (error) {
        console.error("Logout failed:", error);
      }
    } else {
      navigate("/login");
    }
  };
  

  const { unreadCount } = useNotifications();

  return (
    <NavbarContainer isSidebarOpen={isSidebarOpen}>
      <NavbarToolbar>
        <LogoContainer>
          <Link to="/">
            <NavbarLogo src="/museum-icon.svg" alt="Museum Icon" />
          </Link>

          <StyledLink to="/exhibitions">
            <NavbarTitle>Exhibitions</NavbarTitle>
          </StyledLink>

          <StyledLink to="/gallery">
            <NavbarTitle>Gallery</NavbarTitle>
          </StyledLink>
        </LogoContainer>

        <NavbarActions>
          {user ? (
            <>
              <Link to="/notifications">
                <NavbarIconButton>
                  <Badge badgeContent={unreadCount} color="error">
                    <StyledNotifications />
                  </Badge>
                </NavbarIconButton>
              </Link>

              <Link to="/profile">
                <NavbarIconButton>
                  <StyledAccountCircle />
                </NavbarIconButton>
              </Link>

              <NavbarButton onClick={handleAuth}>Log out</NavbarButton>
            </>
          ) : (
            <NavbarButton onClick={handleAuth}>Log in</NavbarButton>
          )}
        </NavbarActions>
      </NavbarToolbar>
    </NavbarContainer>
  );
};

export default DynamicNavbar;
