import { styled } from "@mui/material/styles";
import { Box, Typography, Avatar } from "@mui/material";

export const ReviewContainer = styled(Box)(({ theme }) => ({
  border: "1px solid #e0e0e0",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
}));

export const ReviewHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

export const UserContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  marginRight: theme.spacing(1),
}));

export const ReviewActions = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
}));

export const ReviewText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));
