import { styled } from "@mui/material/styles";
import { Box, IconButton } from "@mui/material";

export const CarouselContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
});

export const CarouselImage = styled("img")({
  width: "100%",
  maxWidth: "500px",
  height: "auto",
  borderRadius: "8px",
  objectFit: "cover",
});

export const NavButtonLeft = styled(IconButton)({
  position: "absolute",
  left: 0,
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "#fff",
  transition: "all 0.3s ease-in-out",

  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    transform: "translateY(-50%) scale(1.2)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  },
});

export const NavButtonRight = styled(IconButton)({
  position: "absolute",
  right: 0,
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "#fff",
  transition: "all 0.3s ease-in-out",

  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    transform: "translateY(-50%) scale(1.2)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  },
});
