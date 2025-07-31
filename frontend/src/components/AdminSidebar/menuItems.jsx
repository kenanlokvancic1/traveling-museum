import React from "react";
import {
  Collections,
  ArtTrack,
  Update,
  Analytics,
  CalendarMonth,
} from "@mui/icons-material";

export const menuItems = [
  {
    to: "/manage-exhibitions",
    icon: <Collections />,
    text: "Manage Exhibitions",
  },
  { to: "/manage-paintings", icon: <ArtTrack />, text: "Manage Paintings" },
  { to: "/tracking", icon: <Update />, text: "Tracking" },
  {
    to: "/reports-analytics",
    icon: <Analytics />,
    text: "Reports and Analytics",
  },
  {
    to: "/exhibition-schedule",
    icon: <CalendarMonth />,
    text: "Exhibition Schedule",
  },
];
