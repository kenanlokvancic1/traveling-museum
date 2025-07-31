import { styled } from "@mui/material/styles";
import { Box, Typography, IconButton } from "@mui/material";
import { Notifications } from "@mui/icons-material";

export const NotificationContainer = styled(Box)(({ theme, read }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "15px 20px",
  borderRadius: 4,
  boxShadow: 3,
  cursor: "pointer",
  transition: "all 0.3s ease",
  backgroundColor: read ? "white" : "#FAE5D3",
  borderLeft: read ? "none" : "4px solid #8D5524",
  "&:hover": {
    backgroundColor: "#F1EBDE",
    transform: "scale(1.02)",
  },
}));

export const NotificationIcon = styled(Notifications)(({ theme, read }) => ({
  fontSize: 30,
  color: read ? theme.palette.grey[600] : "#8D5524",
  marginRight: "15px",
}));

export const NotificationTextContainer = styled(Box)({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
});

export const NotificationTitle = styled(Typography)(({ theme, read }) => ({
  fontSize: "1.2rem",
  fontWeight: read ? "normal" : "bold",
  color: read ? "black" : "#5A352A",
}));

export const NotificationTimeAgo = styled(Typography)({
  fontSize: "0.9rem",
  color: "grey.600",
  marginLeft: "10px",
});

export const NotificationActions = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

export const DeleteButton = styled(IconButton)({
  color: "red",
  "&:hover": {
    color: "darkred",
  },
});
