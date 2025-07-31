import { Box, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CarouselContainer = styled(Box)(({ mobile }) => ({
  position: "relative",
  width: "100%",
  height: mobile ? "60vh" : "calc(100vh )",
  overflow: "hidden",
}));

export const CarouselTrack = styled(Box)(({ slideIndex }) => ({
  display: "flex",
  width: "100%",
  height: "100%",
  transform: `translateX(-${slideIndex * 100}%)`,
  transition: "transform 0.5s ease-in-out",
}));

export const CarouselImageContainer = styled(Box)({
  width: "100%",
  height: "100%",
  flex: "0 0 100%",
  position: "relative",
  overflow: "hidden",
});

export const CarouselImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const Overlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.41)",
});

export const ArrowButton = styled(IconButton)({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "transparent",
  color: "white",
  padding: "16px",
  zIndex: 10,
});

export const LeftArrow = styled(ArrowButton)({
  left: "16px",
});

export const RightArrow = styled(ArrowButton)({
  right: "16px",
});

export const CarouselTitle = styled(Typography)(({ mobile }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  fontWeight: "normal",
  opacity: 0.82,
  textAlign: "center",
  zIndex: 5,
  fontSize: mobile ? "24px" : "42px",
  "& span": {
    fontSize: mobile ? "36px" : "62px",
  },
}));

export const ArrowSymbol = styled(Typography)(({ theme, mobile }) => ({
  color: "#C7BFAB",
  opacity: 0.82,
  cursor: "pointer",
  transition: "opacity 0.3s ease",
  "&:hover": {
    opacity: 1,
  },
  fontSize: mobile ? "32px" : "48px",
}));
