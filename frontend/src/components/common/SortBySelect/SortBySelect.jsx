import React from "react";
import { InputLabel, Select, MenuItem } from "@mui/material";
import { StyledFormControl } from "./SortBySelect.styles";

const SortBySelect = ({
  value,
  onChange,
  options,
  label = "Sort By",
  size = "small",
}) => {
  return (
    <StyledFormControl variant="outlined" size={size}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange} label={label}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

export default SortBySelect;
