import React, { useState, useEffect } from "react";
import { Box, useMediaQuery, useTheme, Typography } from "@mui/material";
import {
  CarouselContainer,
  CarouselTrack,
  CarouselImageContainer,
  CarouselImage,
  Overlay,
  LeftArrow,
  RightArrow,
  CarouselTitle,
  ArrowSymbol,
} from "./Carousel.styles";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (isClicked || isMobile) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length, isClicked, isMobile]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleCarouselClick = () => {
    setIsClicked(true);
  };

  return (
    <CarouselContainer mobile={isMobile} onClick={handleCarouselClick}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <CarouselTrack slideIndex={currentIndex}>
          {images.map((image, index) => (
            <CarouselImageContainer key={index}>
              <CarouselImage src={image} alt={`Carousel Image ${index + 1}`} />
              <Overlay />
              {index === 0 && (
                <CarouselTitle mobile={isMobile}>
                  <Typography
                    component="span"
                    sx={{ textTransform: "uppercase" }}
                  >
                    T
                  </Typography>
                  AKE{" "}
                  <Typography
                    component="span"
                    sx={{ textTransform: "uppercase" }}
                  >
                    T
                  </Typography>
                  HE{" "}
                  <Typography
                    component="span"
                    sx={{ textTransform: "uppercase" }}
                  >
                    T
                  </Typography>
                  OUR
                </CarouselTitle>
              )}
            </CarouselImageContainer>
          ))}
        </CarouselTrack>
      </Box>
      {images.length > 1 && (
        <>
          <LeftArrow
            onClick={goToPrevious}
            aria-label="previous image"
            disableRipple
          >
            <ArrowSymbol mobile={isMobile}>&lt;</ArrowSymbol>
          </LeftArrow>
          <RightArrow onClick={goToNext} aria-label="next image" disableRipple>
            <ArrowSymbol mobile={isMobile}>&gt;</ArrowSymbol>
          </RightArrow>
        </>
      )}
    </CarouselContainer>
  );
};

export default Carousel;
