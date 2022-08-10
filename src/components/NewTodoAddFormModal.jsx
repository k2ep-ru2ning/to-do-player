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
      className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4"
    >
      <section className="bg-gray-50 rounded-lg p-4 md:p-6 flex flex-col gap-y-4 w-72 md:w-96">
        <div className="flex justify-end">
          <button onClick={onClose}>
            <IoCloseSharp size={20} />
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
