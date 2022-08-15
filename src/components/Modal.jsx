import PropTypes from "prop-types";
import ReactModal from "react-modal";

export default function Modal({ isOpen, children }) {
  return (
    <ReactModal
      isOpen={isOpen}
      bodyOpenClassName="overflow-hidden"
      overlayClassName="fixed inset-0 bg-black/50"
      className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4"
    >
      {children}
    </ReactModal>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
