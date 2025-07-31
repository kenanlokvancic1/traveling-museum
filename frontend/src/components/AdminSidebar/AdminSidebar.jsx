import * as React from "react";
import {
  SidebarContainer,
  SidebarMenu,
  SidebarToggleButton,
  SidebarMenuIcon,
  SidebarList,
  SidebarItem,
  SidebarItemIcon,
  SidebarItemText,
  MainContent,
  StyledNavLink,
} from "./AdminSidebar.styles";
import { DynamicNavbar } from "./DynamicNavbar";
import {
  Dashboard,
  Collections,
  ArtTrack,
  Update,
  Analytics,
  CalendarMonth,
  CircleNotifications,
  People,
  Backup,
  Museum,
} from "@mui/icons-material";

export default function AdminSidebar({ children }) {
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const menuItems = [
    { to: "/admin-dashboard", icon: <Dashboard />, text: "Dashboard" },
    { to: "/museums", icon: <Museum />, text: "Museums" },
    { to: "/manage-exhibitions", icon: <Collections />, text: "Manage Exhibitions"},
    { to: "/manage-paintings", icon: <ArtTrack />, text: "Manage Paintings" },
    { to: "/tracking", icon: <Update />, text: "Tracking" },
    { to: "/reports-analytics", icon: <Analytics />, text: "Reports and Analytics" },
    { to: "/exhibitions-schedule", icon: <CalendarMonth />, text: "Exhibition Schedule" },
    {to: "/admin/user-management", icon: <People />, text: "User Management" },
  ];


  return (
    <SidebarContainer>
      <DynamicNavbar isSidebarOpen={open} toggleSidebar={toggleDrawer} />

      <SidebarMenu variant="permanent" open={open}>
        <SidebarToggleButton onClick={toggleDrawer} open={open}>
          <SidebarMenuIcon open={open} />
        </SidebarToggleButton>

        <SidebarList>
          {menuItems.map(({ to, icon, text }) => (
            <StyledNavLink key={to} to={to}>
              <SidebarItem>
                <SidebarItemIcon open={open}>{icon}</SidebarItemIcon>
                <SidebarItemText open={open} primary={text} />
              </SidebarItem>
            </StyledNavLink>
          ))}
        </SidebarList>
      </SidebarMenu>

      <MainContent open={open}>{children}</MainContent>
    </SidebarContainer>
  );
}
