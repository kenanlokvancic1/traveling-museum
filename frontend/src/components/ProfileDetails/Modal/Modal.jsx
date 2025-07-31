import { ModalOverlay, ModalContainer, CloseButton } from "./Modal.styles";
import CloseIcon from "@mui/icons-material/Close";
import { useModalHelper } from "./modalHelper";

function Modal({ children, onClose }) {
  const { handleOverlayClick } = useModalHelper(onClose);

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <CloseButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </CloseButton>
        {children}
      </ModalContainer>
    </ModalOverlay>
  );
}

export default Modal;
