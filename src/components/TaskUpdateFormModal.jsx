import PropTypes from "prop-types";
import { IoCloseSharp } from "react-icons/io5";
import LayoutModal from "./LayoutModal";
import TaskUpdateForm from "./TaskUpdateForm";

export default function TaskUpdateFormModal({ isOpen, onClose, onSubmit, defaultValues }) {
  return (
    <LayoutModal isOpen={isOpen}>
      <section className="bg-gray-50 rounded-lg p-4 md:p-6 flex flex-col gap-y-4 w-72 md:w-96">
        <div className="flex justify-end">
          <button onClick={onClose}>
            <IoCloseSharp size={20} />
          </button>
        </div>
        <header className="text-center p-2">
          <h1 className="text-xl font-bold">할 일 수정하기</h1>
        </header>
        <TaskUpdateForm onSubmit={onSubmit} defaultValues={defaultValues} />
      </section>
    </LayoutModal>
  );
}

TaskUpdateFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.object.isRequired,
};
