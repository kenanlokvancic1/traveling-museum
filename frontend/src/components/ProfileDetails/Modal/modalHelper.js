export const useModalHelper = (onClose) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return { handleOverlayClick };
};
