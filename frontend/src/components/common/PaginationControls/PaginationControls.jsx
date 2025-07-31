import React from "react";
import { Pagination } from "@mui/material";
import { PaginationContainer } from "./PaginationControls.styles";

const PaginationControls = ({
  count,
  page,
  onChange,
  color = "primary",
  shape = "rounded",
  showIfSinglePage = false,
}) => {
  if (count <= 1 && !showIfSinglePage) {
    return null;
  }

  return (
    <PaginationContainer>
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        color={color}
        shape={shape}
      />
    </PaginationContainer>
  );
};

export default PaginationControls;
