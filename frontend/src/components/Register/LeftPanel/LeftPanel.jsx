import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const LeftPanel = styled(Box)(({ theme }) => ({
  flex: 2,
  padding: theme.spacing(10),
}));
