import { useCallback, useReducer } from "react";
import { nanoid } from "nanoid";
import TaskList from "./TaskList";
import { convertTimeFromHourMinuteSecondToSecond } from "../utils/timeConvertor";
import useModal from "../hooks/useModal";
import TaskAddFormModal from "./TaskAddFormModal";

export default function TasksManager() {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  const { isModalOpen, openModal, closeModal } = useModal();

  const handleTaskAddFormSubmit = useCallback(
    ({ taskName, taskTimeHour, taskTimeMinute, taskTimeSecond }) => {
      const inputTimeInSecond = convertTimeFromHourMinuteSecondToSecond({
        hour: Number(taskTimeHour),
        minute: Number(taskTimeMinute),
        second: Number(taskTimeSecond),
      });

      const payload = {
        id: nanoid(),
        name: taskName,
        scheduledTimeInSecond: inputTimeInSecond,
        remainingTimeInSecond: inputTimeInSecond,
      };

      dispatch({
        type: "added",
        payload,
      });

      closeModal();
    },
    [closeModal],
  );

  return (
    <div className="relative">
      <button className="absolute top-0 right-0 btn primary-btn text-sm" onClick={openModal}>
        할 일 추가하기
      </button>
      <TaskList tasks={tasks} />
      <TaskAddFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleTaskAddFormSubmit}
      />
    </div>
  );
}

function tasksReducer(state, action) {
  switch (action.type) {
    case "added": {
      return [...state, action.payload];
    }
    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
}
