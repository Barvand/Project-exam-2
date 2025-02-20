import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  height?: string;
}

/**
 * A reusable modal component for displaying content in an overlay.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {boolean} props.isOpen - Determines whether the modal is open or closed.
 * @param {Function} props.onClose - Callback function to handle closing the modal.
 * @param {string} [props.title] - Optional title to display at the top of the modal.
 * @param {React.ReactNode} props.children - Dynamic content to be displayed inside the modal.
 * @param {string} [props.height] - Optional custom height for the modal.
 *
 * @description
 * - Displays a modal overlay when `isOpen` is `true`.
 * - Listens for the `Escape` key to close the modal.
 * - Accepts a title and dynamic children for flexibility.
 * - Allows setting a custom height if needed.
 *
 * @example
 * ```tsx
 * <Modal isOpen={isModalOpen} onClose={handleClose} title="Modal Title">
 *   <p>This is the modal content.</p>
 * </Modal>
 * ```
 *
 * @returns {JSX.Element | null} A modal component or `null` if `isOpen` is `false`.
 */
function Modal({ isOpen, onClose, title, children, height }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg relative overflow-y-auto"
        style={{ height: height || "auto" }}
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Modal Title */}
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}

        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
