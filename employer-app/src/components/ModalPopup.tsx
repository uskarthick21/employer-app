import ReactDOM from "react-dom";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

function ModalPopup({ onClose, children }: ModalProps) {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    console.error("Modal root element not found");
    return null;
  }

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        <button
          type="button"
          onClick={onClose}
          className="close-button"
          aria-label="Close modal"
        >
          X
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>,
    modalRoot
  );
}

export default ModalPopup;
