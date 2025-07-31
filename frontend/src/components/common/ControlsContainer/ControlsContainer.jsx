import React from "react";
import { FilterContainer, Controls } from "./ControlsContainer.styles";

const ControlsContainer = ({ children, controls }) => {
  return (
    <FilterContainer>
      {children}
      <Controls>{controls}</Controls>
    </FilterContainer>
  );
};

export default ControlsContainer;
