import React, { useState } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { CarouselContainer, CarouselImage, NavButtonLeft, NavButtonRight } from "./ImageCarousel.styles";

const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
    };

    return (
        <CarouselContainer>
            <CarouselImage
                src={typeof images[currentIndex] === "string"
                    ? images[currentIndex]
                    : URL.createObjectURL(images[currentIndex])}
                alt={`Image ${currentIndex + 1}`}
            />
            <NavButtonLeft onClick={prevImage}>
                <ArrowBack />
            </NavButtonLeft>
            <NavButtonRight onClick={nextImage}>
                <ArrowForward />
            </NavButtonRight>
        </CarouselContainer>
    );
};

export default ImageCarousel;
