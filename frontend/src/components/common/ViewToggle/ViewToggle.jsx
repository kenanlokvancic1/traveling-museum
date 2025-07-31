import React from "react";
import { ToggleButton } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import { StyledToggleButtonGroup } from "./ViewToggle.styles";

const ViewToggle = ({ value, onChange, size = "small" }) => {
  return (
    <StyledToggleButtonGroup
      value={value}
      exclusive
      onChange={onChange}
      aria-label="view layout"
      size={size}
    >
      <ToggleButton value="grid" aria-label="grid view">
        <GridViewIcon />
      </ToggleButton>
      <ToggleButton value="list" aria-label="list view">
        <ViewListIcon />
      </ToggleButton>
    </StyledToggleButtonGroup>
  );
};

export default ViewToggle;
