import React from "react";
import { CuratorSidebar } from "../CuratorSidebar"; 
import { AdminSidebar } from "../AdminSidebar";  
import { Navbar } from "../Navbar"; 
import { PageContainer, ContentWrapper } from "./NavbarContainer.styles"; 
import { Outlet } from "react-router-dom"; 
import { useSelector } from "react-redux";


const NavbarContainer = () => {
  const user = useSelector((state) => state.user.user);

  const isAdmin = user?.role === "admin";
  const isCurator = user?.role === "curator";

  return (
    <PageContainer isCurator={isCurator || isAdmin}>
      {isAdmin ? (
        <AdminSidebar />
      ) : isCurator ? (
        <CuratorSidebar />
      ) : (
        <Navbar />
      )}

      <ContentWrapper isCurator={isCurator || isAdmin}>
        <Outlet />
      </ContentWrapper>
    </PageContainer>
  );
};

export default NavbarContainer;
