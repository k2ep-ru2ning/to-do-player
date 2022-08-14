import PropTypes from "prop-types";
import { convertTimeFromSecondToHourMinuteSecond } from "../utils/timeConvertor";
import { formatTime } from "../utils/timeFormatter";
import useModal from "../hooks/useModal";
import TaskUpdateFormModal from "./TaskUpdateFormModal";
import { useCallback } from "react";
import { taskUpdateFormFieldName } from "./TaskUpdateForm";
import { useTasksDispatch } from "../context/TasksContext";

export default function TaskListItem({ task }) {
  const { id, name, scheduledTimeInSecond, remainingTimeInSecond } = task;

  const {
    isModalOpen: isTaskUpdateFormModalOpen,
    openModal: openTaskUpdateFormModal,
    closeModal: closeTaskUpdateFormModal,
  } = useModal();

  const dispatch = useTasksDispatch();

  const handleTaskUpdateFormSubmit = useCallback(
    (taskUpdateFormInput) => {
      dispatch({
        type: "updated",
        payload: {
          task: {
            id,
            name: taskUpdateFormInput[taskUpdateFormFieldName.NAME],
            hour: Number(taskUpdateFormInput[taskUpdateFormFieldName.HOUR]),
            minute: Number(taskUpdateFormInput[taskUpdateFormFieldName.MINUTE]),
            second: Number(taskUpdateFormInput[taskUpdateFormFieldName.SECOND]),
          },
        },
      });
      closeTaskUpdateFormModal();
    },
    [id],
  );

  const formattedScheduledTime = formatTime(
    convertTimeFromSecondToHourMinuteSecond(scheduledTimeInSecond),
  );

  const formattedRemainingTime = formatTime(
    convertTimeFromSecondToHourMinuteSecond(remainingTimeInSecond),
  );

  const taskUpdateFormDefaultValues = convertTaskToTaskUpdateFormDefaultValues(task);

  return (
    <li className="flex items-center px-4 py-3 bg-gray-100 rounded-lg">
      <div className="w-1/4">{name}</div>
      <div className="space-y-1">
        <div>계획 시간: {formattedScheduledTime}</div>
        <div>남은 시간: {formattedRemainingTime}</div>
      </div>
      <div className="ml-auto">
        <button onClick={openTaskUpdateFormModal} className="btn primary-btn text-sm">
          수정하기
        </button>
      </div>
      <TaskUpdateFormModal
        isOpen={isTaskUpdateFormModalOpen}
        onClose={closeTaskUpdateFormModal}
        onSubmit={handleTaskUpdateFormSubmit}
        defaultValues={taskUpdateFormDefaultValues}
      />
    </li>
  );
}

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

TaskListItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    scheduledTimeInSecond: PropTypes.number.isRequired,
    remainingTimeInSecond: PropTypes.number.isRequired,
  }).isRequired,
};
