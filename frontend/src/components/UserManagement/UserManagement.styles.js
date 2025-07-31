import { styled } from "@mui/material/styles";
import {
  TableContainer,
  TableCell,
  Box,
  Typography,
  Paper,
  Table,
} from "@mui/material";

export const StyledTableContainer = styled(TableContainer)({
  maxHeight: "1200px",
  overflowY: "hidden",
  paddingTop: "20px",
  paddingBottom: "20px",
  paddingLeft: "20px",
  paddingRight: "20px",
});

export const StyledTable = styled(Table)(({ theme }) => ({
  borderRadius: "16px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  border: "1px solid #ccc",
  backgroundColor: theme.palette.background.paper,
  borderCollapse: "separate",
  borderSpacing: 0,
  overflow: "hidden",
  "& .MuiTableRow-root:last-child td:first-of-type": {
    borderBottomLeftRadius: "16px",
  },
  "& .MuiTableRow-root:last-child td:last-of-type": {
    borderBottomRightRadius: "16px",
  },
}));

export const StyledTableHeader = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#8D5524",
  color: "#FFFFFF",
  fontWeight: "bold",
  padding: theme.spacing(2),
  position: "sticky",
  top: 0,
  zIndex: 1000,
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: "left",
  "&:last-child td:first-of-type": {
    borderBottomLeftRadius: "16px",
  },
  "&:last-child td:last-of-type": {
    borderBottomRightRadius: "16px",
  },
}));

export const CenteredProgressContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
}));

export const ErrorText = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  textAlign: "center",
  marginTop: theme.spacing(2),
}));
