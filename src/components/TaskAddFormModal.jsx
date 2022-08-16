import PropTypes from "prop-types";
import TaskAddForm, { taskAddFormFieldName } from "./TaskAddForm";
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <section className="flex flex-col gap-y-4 w-72 md:w-96">
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
