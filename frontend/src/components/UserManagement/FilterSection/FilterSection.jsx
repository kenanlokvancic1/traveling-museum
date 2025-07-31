import React from "react";
import {
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";

import {
  FilterContainer,
  SearchTextField,
  FilterFormControl,
  RightAlignedBox,
  SearchIconAdornment,
} from "./FilterSection.styles";

import ResetFilters from "../../../components/common/ResetFilters";

const FilterSection = ({
  searchTerm,
  onSearchChange,
  verifiedFilter,
  onVerifiedFilterChange,
  onResetFilters,
}) => (
  <FilterContainer>
    <SearchTextField
      label="Search for user"
      variant="outlined"
      size="small"
      value={searchTerm}
      onChange={onSearchChange}
      slots={{
        startAdornment: SearchIconAdornment,
      }}
      slotProps={{
        startAdornment: {
          position: "start",
          children: <Search />,
        },
      }}
    />

    <FilterFormControl component="fieldset">
      <FormLabel component="legend">
        <Typography variant="body2">Verified</Typography>
      </FormLabel>
      <RadioGroup
        row
        name="verified"
        value={verifiedFilter !== null ? String(verifiedFilter) : ""}
        onChange={onVerifiedFilterChange}
      >
        <FormControlLabel value="" control={<Radio />} label="All" />
        <FormControlLabel value="true" control={<Radio />} label="Verified" />
        <FormControlLabel
          value="false"
          control={<Radio />}
          label="Not Verified"
        />
      </RadioGroup>
    </FilterFormControl>

    <RightAlignedBox>
      <ResetFilters onClick={onResetFilters} />
    </RightAlignedBox>
  </FilterContainer>
);

export default FilterSection;
