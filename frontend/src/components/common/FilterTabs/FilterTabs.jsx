import React from "react";
import { Tab } from "@mui/material";
import { StyledTabs } from "./FilterTabs.styles";

const FilterTabs = ({
  value,
  onChange,
  tabs,
  indicatorColor = "primary",
  textColor = "primary",
}) => {
  return (
    <StyledTabs
      value={value}
      onChange={onChange}
      indicatorColor={indicatorColor}
      textColor={textColor}
    >
      {tabs.map((tab) => (
        <Tab key={tab.value} value={tab.value} label={tab.label} />
      ))}
    </StyledTabs>
  );
};

export default FilterTabs;
