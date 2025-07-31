import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const ReportContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  paddingTop: "120px",
  paddingBottom: "40px",
  paddingLeft: "40px",
  paddingRight: "40px",
  [theme.breakpoints.down("sm")]: {
    paddingTop: "90px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
}));

export const ReportTitle = styled(Typography)(({ theme }) => ({
  color: "#8D5524",
  marginBottom: theme.spacing(3),
  fontSize: "2rem",
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
    textAlign: "center",
  },
}));

export const TableWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  maxHeight: "400px",
  overflowY: "auto",
  '& table': {
    width: "100%",
    borderCollapse: "collapse",
  },
  '& th, td': {
    padding: theme.spacing(1),
    textAlign: "left",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  '& th': {
    backgroundColor: theme.palette.background.default,
    fontWeight: "bold",
  },
}));
