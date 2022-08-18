import TaskList from "./TaskList";
import useModal from "../hooks/useModal";
import TaskAddFormModal from "./TaskAddFormModal";
import { useCallback, useReducer } from "react";
import { convertTimeFromHourMinuteSecondToSecond } from "../utils/timeConvertor";
import { nanoid } from "nanoid";
import TaskDetail from "./TaskDetail";

export default function TasksManager() {
  const [tasks, dispatch] = useReducer(tasksReducer, { items: [] });

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
        <TaskList tasks={tasks} dispatch={dispatch} />
        <TaskAddFormModal
          isOpen={isTaskAddFormModalOpen}
          onClose={closeTaskAddFormModal}
          onSubmit={handleAddTask}
        />
      </div>
    </div>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case "added": {
      const { id, name, hour, minute, second } = action.payload.task;
      const inputTimeInSecond = convertTimeFromHourMinuteSecondToSecond({ hour, minute, second });
      return {
        ...tasks,
        items: [
          ...tasks.items,
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
        ...tasks,
        items: tasks.items.map((item) =>
          item.id === id
            ? {
                ...item,
                name,
                scheduledTimeInSecond: inputTimeInSecond,
                remainingTimeInSecond: inputTimeInSecond,
              }
            : item,
        ),
      };
    }
    case "removed": {
      const { id } = action.payload.task;
      return {
        ...tasks,
        items: tasks.items.filter((item) => item.id !== id),
      };
    }
    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
}
