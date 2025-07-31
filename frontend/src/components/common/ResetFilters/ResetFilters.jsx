import React from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { StyledButton } from "./ResetFilters.styles";

const ResetFilters = ({ onClick, size = "small" }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <StyledButton
      variant="outlined"
      startIcon={!isMobile ? <RestartAltIcon /> : undefined}
      onClick={onClick}
      size={size}
      isMobile={isMobile}
    >
      {isMobile ? <RestartAltIcon /> : "Reset Filters"}
    </StyledButton>
  );
};

export default ResetFilters;
