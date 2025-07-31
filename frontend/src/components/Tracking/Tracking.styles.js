import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";

export const PageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100vh",
  alignContent: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const ContentContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  marginTop: theme.spacing(18),
  paddingRight: theme.spacing(15),
  paddingLeft: theme.spacing(15),
  paddingBottom: theme.spacing(5),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
  overflowY: "auto",
  [theme.breakpoints.down("sm")]: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    marginTop: theme.spacing(10),
  },
}));

export const FilterWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  flexWrap: "wrap",
  justifyContent: "center",
}));

export const FilterButton = styled(Button)(({ theme, active }) => ({
  cursor: "pointer",
  fontWeight: active ? theme.typography.fontWeightBold : theme.typography.fontWeightRegular,
  borderBottom: active ? `2px solid #8D5524` : "none",
  paddingBottom: theme.spacing(0.5),
  transition: theme.transitions.create(["color", "border-bottom"], {
    duration: theme.transitions.duration.short,
  }),
  color: "#8D5524",
  "&:hover": {
    color: "#8D5524",
  },
}));

export const Table = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2.5),
}));

export const TableRow = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(3),
  boxShadow: theme.shadows[2],
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: theme.spacing(1.5),
  },
}));

export const TableCell = styled(Box)(({ theme }) => ({
  flex: 1,
  fontSize: theme.typography.pxToRem(16),
  fontWeight: theme.typography.fontWeightMedium,
  textAlign: "left",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "left",
  },
  "&:nth-of-type(2)": {
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      textAlign: "left",
    },
  },
  "&:nth-of-type(3)": {
    textAlign: "right",
    [theme.breakpoints.down("sm")]: {
      textAlign: "left",
    },
  },
}));

export const StatusBadge = styled(Box)(({ status, theme }) => ({
  padding: theme.spacing(0.75, 2),
  borderRadius: theme.shape.borderRadius * 5,
  fontSize: theme.typography.pxToRem(14),
  fontWeight: theme.typography.fontWeightBold,
  textTransform: "capitalize",
  display: "inline-block",
  backgroundColor:
    status === "in transport"
      ? "#fde68a"
      : status === "in warehouse"
      ? "#C7BFAB"
      : "#bbf7d0",
  color: theme.palette.text.primary,
}));

export const ViewButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#8D5524",
  color: theme.palette.common.white,
  padding: theme.spacing(1, 2.5),
  borderRadius: theme.shape.borderRadius * 1.5,
  textTransform: "none",
  fontWeight: theme.typography.fontWeightBold,
  transition: theme.transitions.create("background-color", {
    duration: theme.transitions.duration.short,
  }),
  "&:hover": {
    backgroundColor: "#A66D3A",
  },
}));
