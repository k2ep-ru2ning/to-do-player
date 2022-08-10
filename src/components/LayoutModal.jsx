import PropTypes from "prop-types";
import ReactModal from "react-modal";

export default function LayoutModal({ isOpen, children }) {
  return (
    <ReactModal
      isOpen={isOpen}
      bodyOpenClassName="overflow-hidden"
      style={{
        overlay: {
          backgroundColor: `rgba(0, 0, 0, 0.5)`,
        },
      }}
      className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4"
    >
      {children}
    </ReactModal>
  );
}

LayoutModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
