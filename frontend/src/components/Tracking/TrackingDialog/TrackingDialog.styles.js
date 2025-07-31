import { Dialog, DialogContent, IconButton } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

export const DialogContainer = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    width: "100%",
    maxWidth: 800,
    borderRadius: theme.spacing(1.5),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(1),
      maxWidth: "100%",
    },
  },
}));

export const DialogHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2, 2, 1),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5, 1.5, 0.5),
  },
}));

export const DialogTitle = styled("h2")(({ theme }) => ({
  fontSize: theme.typography.pxToRem(18),
  fontWeight: 600,
  margin: 0,
  borderBottom: `2px solid ${alpha(theme.palette.divider, 1)}`
}));

export const CloseButton = styled(IconButton)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(18),
  padding: theme.spacing(0.5),
}));

export const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5),
    gap: theme.spacing(1.5),
  },
}));

export const Section = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
}));

export const SectionTitle = styled("h4")(({ theme }) => ({
  fontWeight: 600,
  fontSize: theme.typography.pxToRem(15),
  margin: 0,
  borderBottom: `1px solid ${theme.palette.divider}`,
  paddingBottom: theme.spacing(0.5),
}));

export const ImagePreviewWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: 140,
  textAlign: "center",
  flex: "1 1 auto",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
}));

export const ImagePreview = styled("img")(({ theme }) => ({
  width: "100%",
  height: 90,
  objectFit: "cover",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

export const Title = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(1),
  fontSize: theme.typography.pxToRem(13),
  color: theme.palette.text.primary,
}));

export const MapWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  height: 220,
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  marginTop: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    height: 180,
  },
}));

export const PaintingsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1.5),
  justifyContent: "flex-start",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
  },
}));
