import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  Button,
  TableContainer,
  TableCell,
} from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: `${theme.spacing(14)} ${theme.spacing(8)} ${theme.spacing(8)}`,
  height: `calc(100% - ${theme.spacing(2)})`,
  overflow: "hidden",
}));

export const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(1),
  color: "#8D5524",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: theme.spacing(2),
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h5.fontSize,
  fontWeight: theme.typography.fontWeightBold,
}));

export const AddButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  alignSelf: "center",
  backgroundColor: "#8D5524",
  color: theme.palette.common.white,
  textTransform: "none",
  padding: theme.spacing(1.5, 3),
  borderRadius: "30px",
  "&:hover": {
    backgroundColor: "#A65C2A",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  },
}));

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  flexGrow: 1,
  overflowY: "auto",
  maxHeight: `calc(100vh - ${theme.spacing(6)})`,
  boxShadow: theme.shadows[1],
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.down("sm")]: {
    maxHeight: `calc(60vh - ${theme.spacing(2)})`,
  },
  "&::-webkit-scrollbar": {
    width: "12px",
    height: "12px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "4px",
    border: "3px solid #f1f1f1",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#666",
  },
}));

export const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#8D5524",
  color: theme.palette.common.white,
  fontWeight: theme.typography.fontWeightMedium,
  position: "sticky",
  top: 0,
  zIndex: 1,
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: theme.spacing(30),
}));
