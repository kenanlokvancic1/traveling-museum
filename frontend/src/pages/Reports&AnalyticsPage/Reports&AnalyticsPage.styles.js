import { styled } from "@mui/system";
import { Card, CardActionArea, CardContent, Box } from "@mui/material";

export const StyledContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  gap: "4rem",
  height: "100vh",
  backgroundColor: "#C7BFAB", 
  backgroundPosition: "center",
  overflow: "hidden",
});

  
export const StyledCard = styled(Card)({
  width: "480px",
  height: "320px",
  position: "relative",
  borderRadius: "16px",
  overflow: "hidden",
  backgroundColor: "rgba(199, 191, 171, 0.85)",
  transition: "transform 0.4s ease, box-shadow 0.4s ease",

  "&:hover": {
    transform: "scale(1.08)",
    boxShadow: "0px 15px 40px rgba(90, 60, 30, 0.5)",  
  },
});

export const StyledImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
  top: 0,
  left: 0,
  filter: "brightness(75%)",
  transition: "filter 0.3s ease-in-out",

  [`${StyledCard}:hover &`]: {
    filter: "brightness(90%)",
  },
});

export const StyledCardActionArea = styled(CardActionArea)({
  position: "relative",
  zIndex: 2,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "flex-end",
});

export const StyledCardContent = styled(CardContent)({
  zIndex: 3,
  padding: "2rem",
  color: "#F8F8FF",

  "& h4": {
    fontSize: "1.8rem",
    fontWeight: 700,
    marginBottom: "0.5rem",
  },
  "& p": {
    fontSize: "1.1rem",
    opacity: 0.85,
  },
});
