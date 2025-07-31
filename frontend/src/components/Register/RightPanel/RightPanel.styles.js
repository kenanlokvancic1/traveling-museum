import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const StyledRightPanel = styled(Box)(({ theme }) => ({
  flex: 1,
  borderLeft: "1px solid #000",
  backgroundColor: "#D9D9D9",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

export const PlaceholderImage = styled("img")({
  width: "100%",
  height: "100%",
  display: "block",
  objectFit: "fill",
});
