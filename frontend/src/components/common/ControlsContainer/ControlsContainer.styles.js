import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const FilterContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(4),
  flexWrap: "wrap",
  gap: theme.spacing(2),

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const Controls = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    justifyContent: "center",
    flexWrap: "wrap",
  },
}));
