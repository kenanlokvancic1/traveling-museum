import { styled } from "@mui/material/styles";
import { ToggleButtonGroup } from "@mui/material";

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(
  ({ theme }) => ({
    "& .MuiToggleButton-root": {
      borderRadius: 0,
      border: "1px solid rgba(0, 0, 0, 0.12)",
      padding: theme.spacing(1),
    },

    [theme.breakpoints.down("sm")]: {
      marginLeft: "auto",
    },
  })
);
