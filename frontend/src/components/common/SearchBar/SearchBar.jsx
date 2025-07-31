import React from "react";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { StyledSearchBar } from "./SearchBar.styles";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
  size = "small",
}) => {
  return (
    <StyledSearchBar
      placeholder={placeholder}
      variant="outlined"
      size={size}
      value={value}
      onChange={onChange}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default SearchBar;
