import PropTypes from "prop-types";
import TaskUpdateFormModal from "./TaskUpdateFormModal";
import { useCallback } from "react";
import FormattedTime from "./FormattedTime";
import { useDisclosure } from "@chakra-ui/react";

export default function ScheduledTaskListItem({ task, dispatch }) {
  const {
    isOpen: isTaskUpdateFormModalOpen,
    onOpen: onOpenTaskUpdateFormModal,
    onClose: onCloseTaskUpdateFormModal,
  } = useDisclosure();

  const handleUpdateTask = useCallback(({ id, name, hour, minute, second }) => {
    dispatch({
      type: "updated",
      payload: {
        task: { id, name, hour, minute, second },
      },
    });
  }, []);

  const handleRemoveTask = useCallback(() => {
    dispatch({
      type: "removed",
      payload: {
        task: {
          id: task.id,
        },
      },
    });
  }, [task.id]);

  return (
    <li className="flex items-center px-4 py-3 bg-gray-100 rounded-lg">
      <div className="w-1/4">{task.name}</div>
      <div className="space-y-1">
        <FormattedTime prefix="계획 시간" timeInSecond={task.scheduledTimeInSecond} />
        <FormattedTime prefix="남은 시간" timeInSecond={task.remainingTimeInSecond} />
      </div>
      <div className="ml-auto flex gap-x-2">
        <button onClick={onOpenTaskUpdateFormModal} className="btn primary-btn text-sm">
          수정하기
        </button>
        <button onClick={handleRemoveTask} className="btn primary-btn text-sm">
          삭제하기
        </button>
      </div>
      <TaskUpdateFormModal
        isOpen={isTaskUpdateFormModalOpen}
        onClose={onCloseTaskUpdateFormModal}
        onSubmit={handleUpdateTask}
        task={task}
      />
    </li>
  );
}

ScheduledTaskListItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    scheduledTimeInSecond: PropTypes.number.isRequired,
    remainingTimeInSecond: PropTypes.number.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
