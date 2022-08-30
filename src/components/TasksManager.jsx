import { useReducer } from "react";
import { convertTimeFromHourMinuteSecondToSecond } from "../utils/timeConvertor";
import TaskDetail from "./TaskDetail";
import ScheduledTasks from "./ScheduledTasks";
import OpenAddTaskFormModalButton from "./OpenAddTaskFormModalButton";

export default function TasksManager() {
  const [state, dispatch] = useReducer(tasksReducer, { tasks: [] });

  return (
    <>
      <TaskDetail />
      <OpenAddTaskFormModalButton dispatch={dispatch} />
      <ScheduledTasks tasks={state.tasks} dispatch={dispatch} />
    </>
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
