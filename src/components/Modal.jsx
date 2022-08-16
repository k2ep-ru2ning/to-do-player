import PropTypes from "prop-types";
import ReactModal from "react-modal";
import { IoCloseSharp } from "react-icons/io5";

export default function Modal({ isOpen, children, onClose }) {
  return (
    <ReactModal
      isOpen={isOpen}
      bodyOpenClassName="overflow-hidden"
      overlayClassName="fixed inset-0 bg-black/50"
      className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4"
    >
      <div className="bg-gray-50 rounded-lg p-4 md:p-6">
        <div className="text-right">
          <button onClick={onClose}>
            <IoCloseSharp size={20} />
          </button>
        </div>
        {children}
      </div>
    </ReactModal>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
