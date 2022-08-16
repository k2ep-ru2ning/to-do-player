import PropTypes from "prop-types";
import TaskAddForm, { taskAddFormFieldName } from "./TaskAddForm";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "./Modal";
import { useCallback } from "react";

export default function TaskAddFormModal({ isOpen, onClose, onSubmit }) {
  const handleSubmit = useCallback((formInput) => {
    onSubmit({
      name: formInput[taskAddFormFieldName.NAME],
      hour: Number(formInput[taskAddFormFieldName.HOUR]),
      minute: Number(formInput[taskAddFormFieldName.MINUTE]),
      second: Number(formInput[taskAddFormFieldName.SECOND]),
    });
    onClose();
  }, []);

  return (
    <Modal isOpen={isOpen}>
      <section className="bg-gray-50 rounded-lg p-4 md:p-6 flex flex-col gap-y-4 w-72 md:w-96">
        <div className="flex justify-end">
          <button onClick={onClose}>
            <IoCloseSharp size={20} />
          </button>
        </div>
        <header className="text-center p-2">
          <h1 className="text-xl font-bold">새 할 일 추가하기</h1>
        </header>
        <TaskAddForm onSubmit={handleSubmit} />
      </section>
    </Modal>
  );
}

TaskAddFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
