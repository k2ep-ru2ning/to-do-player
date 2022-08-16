import PropTypes from "prop-types";
import { useCallback } from "react";
import { convertTimeFromSecondToHourMinuteSecond } from "../utils/timeConvertor";
import Modal from "./Modal";
import TaskUpdateForm, { taskUpdateFormFieldName } from "./TaskUpdateForm";

export default function TaskUpdateFormModal({ isOpen, onClose, onSubmit, task }) {
  const handleSubmit = useCallback(
    (formInput) => {
      onSubmit({
        id: task.id,
        name: formInput[taskUpdateFormFieldName.NAME],
        hour: Number(formInput[taskUpdateFormFieldName.HOUR]),
        minute: Number(formInput[taskUpdateFormFieldName.MINUTE]),
        second: Number(formInput[taskUpdateFormFieldName.SECOND]),
      });
      onClose();
    },
    [task.id],
  );

  const defaultValues = convertTaskToTaskUpdateFormDefaultValues(task);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <section className="flex flex-col gap-y-4 w-72 md:w-96">
        <header className="text-center p-2">
          <h1 className="text-xl font-bold">할 일 수정하기</h1>
        </header>
        <TaskUpdateForm onSubmit={handleSubmit} defaultValues={defaultValues} />
      </section>
    </Modal>
  );
}

TaskUpdateFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    scheduledTimeInSecond: PropTypes.number.isRequired,
    remainingTimeInSecond: PropTypes.number.isRequired,
  }).isRequired,
};

function convertTaskToTaskUpdateFormDefaultValues(task) {
  const { name, scheduledTimeInSecond } = task;
  const { hour, minute, second } = convertTimeFromSecondToHourMinuteSecond(scheduledTimeInSecond);

  return {
    [taskUpdateFormFieldName.NAME]: name,
    [taskUpdateFormFieldName.HOUR]: hour,
    [taskUpdateFormFieldName.MINUTE]: minute,
    [taskUpdateFormFieldName.SECOND]: second,
  };
}
