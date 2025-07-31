import { styled } from "@mui/material/styles";
import { Paper, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

export const GuestMessageBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  border: "1px solid #ccc",
}));

export const LockIconStyled = styled(LockIcon)(({ theme }) => ({
  fontSize: 32,
  marginBottom: theme.spacing(1),
}));

export const MessageText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));
