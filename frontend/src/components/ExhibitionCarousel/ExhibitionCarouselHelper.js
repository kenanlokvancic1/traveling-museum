import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useExhibitionCarousel = (images, exhibitionId) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [isManageDialogOpen, setIsManageDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);
  const trackRef = useRef(null);
  const navigate = useNavigate();

  const cardWidth = 370;

  const updateTransform = useCallback((index) => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${index * cardWidth}px)`;
    }
  }, []);

  useEffect(() => {
    if (trackRef.current) {
      const containerWidth = trackRef.current.parentElement.offsetWidth;
      const visibleCardsCount = Math.floor(containerWidth / cardWidth);
      setVisibleCards(visibleCardsCount);
    }
  }, [images]);

  useEffect(() => {
    updateTransform(currentIndex);
  }, [currentIndex, updateTransform]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - visibleCards) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsPreviewDialogOpen(true);
  };

  const handleClosePreviewDialog = () => {
    setIsPreviewDialogOpen(false);
  };

  const handleAddClick = () => {
    setIsManageDialogOpen(true);
  };

  const handleCloseManageDialog = () => {
    setIsManageDialogOpen(false);
  };

  const handleAddNewImage = () => {
    navigate("/artwork-form", {
      state: {
        fromExhibition: true,
        exhibitionId,
      },
    });
    handleCloseManageDialog();
  };

  return {
    currentIndex,
    isPreviewDialogOpen,
    isManageDialogOpen,
    selectedImageIndex,
    visibleCards,
    trackRef,
    handlePrevious,
    handleNext,
    handleImageClick,
    handleClosePreviewDialog,
    handleAddClick,
    handleCloseManageDialog,
    handleAddNewImage,
  };
};
