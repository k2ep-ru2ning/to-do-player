import useModal from "../hooks/useModal";
import TaskAddFormModal from "./TaskAddFormModal";
import { useCallback, useReducer } from "react";
import { convertTimeFromHourMinuteSecondToSecond } from "../utils/timeConvertor";
import { nanoid } from "nanoid";
import TaskDetail from "./TaskDetail";
import ScheduledTasks from "./ScheduledTasks";

export default function TasksManager() {
  const [state, dispatch] = useReducer(tasksReducer, { tasks: [] });

  const {
    isModalOpen: isTaskAddFormModalOpen,
    openModal: openTaskAddFormModal,
    closeModal: closeTaskAddFormModal,
  } = useModal();

  const handleAddTask = useCallback(({ name, hour, minute, second }) => {
    dispatch({
      type: "added",
      payload: {
        task: {
          id: nanoid(),
          name,
          hour,
          minute,
          second,
        },
      },
    });
  }, []);

  return (
    <div>
      <TaskDetail />
      <div className="relative">
        <button
          className="absolute top-0 right-0 btn primary-btn text-sm"
          onClick={openTaskAddFormModal}
        >
          할 일 추가하기
        </button>
        <ScheduledTasks tasks={state.tasks} dispatch={dispatch} />
        <TaskAddFormModal
          isOpen={isTaskAddFormModalOpen}
          onClose={closeTaskAddFormModal}
          onSubmit={handleAddTask}
        />
      </div>
    </div>
  );
}

function tasksReducer(state, action) {
  switch (action.type) {
    case "added": {
      const { id, name, hour, minute, second } = action.payload.task;
      const inputTimeInSecond = convertTimeFromHourMinuteSecondToSecond({ hour, minute, second });
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id,
            name,
            scheduledTimeInSecond: inputTimeInSecond,
            remainingTimeInSecond: inputTimeInSecond,
          },
        ],
      };
    }
    case "updated": {
      const { id, name, hour, minute, second } = action.payload.task;
      const inputTimeInSecond = convertTimeFromHourMinuteSecondToSecond({ hour, minute, second });
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === id
            ? {
                ...task,
                name,
                scheduledTimeInSecond: inputTimeInSecond,
                remainingTimeInSecond: inputTimeInSecond,
              }
            : task,
        ),
      };
    }
    case "removed": {
      const { id } = action.payload.task;
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== id),
      };
    }
    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
}
