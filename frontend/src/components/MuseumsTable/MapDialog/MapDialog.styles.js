import { styled } from "@mui/material/styles";
import { Dialog, DialogContent } from "@mui/material";

export const DialogContainer = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

export const DialogHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const DialogTitle = styled("h2")(({ theme }) => ({
  margin: 0,
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
}));

export const CloseButton = styled("button")(({ theme }) => ({
  background: "none",
  border: "none",
  fontSize: theme.typography.h5.fontSize,
  cursor: "pointer",
  color: theme.palette.text.primary,
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

export const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const MapWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  aspectRatio: "16 / 9",
  [theme.breakpoints.down("sm")]: {
    aspectRatio: "4 / 3",
  },
}));
