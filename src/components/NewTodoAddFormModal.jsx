import ReactModal from "react-modal";
import PropTypes from "prop-types";
import NewTodoAddForm from "./NewTodoAddForm";
import { IoCloseSharp } from "react-icons/io5";

export default function NewTodoAddFormModal({ isOpen, onClose, onSubmit }) {
  return (
    <ReactModal
      isOpen={isOpen}
      bodyOpenClassName="overflow-hidden"
      style={{
        overlay: {
          backgroundColor: `rgba(0, 0, 0, 0.5)`,
        },
      }}
      className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 p-4 rounded-lg bg-gray-100"
    >
      <section className="flex flex-col gap-y-4">
        <div className="flex justify-end">
          <button onClick={onClose}>
            <IoCloseSharp />
          </button>
        </div>
        <header className="text-center p-2">
          <h1 className="text-xl font-bold">새 할 일 추가하기</h1>
        </header>
        <NewTodoAddForm onSubmit={onSubmit} />
      </section>
    </ReactModal>
  );
}

NewTodoAddFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
