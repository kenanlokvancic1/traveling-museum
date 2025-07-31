import { styled } from "@mui/material/styles";
import { TableCell, TableContainer, Link } from "@mui/material";

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: "60vh",
  overflowY: "auto",
  backgroundColor: "#fff",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#8D5524",
  color: theme.palette.common.white,
  fontWeight: "bold",
  textAlign: "center",
  "&.MuiTableCell-root": {
    padding: theme.spacing(2),
  },
  "& .MuiTableSortLabel-root": {
    color: "inherit",
    "&:hover": {
      color: theme.palette.common.white,
    },
    "&.Mui-active": {
      color: theme.palette.common.white,
    },
  },
  "& .MuiTableSortLabel-icon": {
    color: `${theme.palette.common.white} !important`,
  },
}));

export const DataTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1.5),
  textAlign: "center",
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "#8D5524",
  fontWeight: 500,
  cursor: "pointer",
  "&:hover": {
    color: "#6d4019",
    textDecoration: "underline",
  },
}));
