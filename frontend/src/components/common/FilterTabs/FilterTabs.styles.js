import { styled } from "@mui/material/styles";
import { Tabs } from "@mui/material";

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  minWidth: 300,
  "& .MuiTab-root": {
    textTransform: "none",
    fontWeight: 500,
  },

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    "& .MuiTabs-flexContainer": {
      justifyContent: "center",
    },
  },
}));
