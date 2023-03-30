import {
  createContext,
  type Dispatch,
  type ReactNode,
  useContext,
  useReducer,
} from "react";

import { type SelectedTask, type Task } from "../types/tasks";
import {
  convertHourMinuteSecondIntoSecond,
  type HourMinuteSecond,
} from "../utils/time";

type Tasks = {
  tasks: Task[];
  selectedTaskId: string | null;
  selectedTaskDeadlineTimeStampInSecond: number | null;
};

type TasksAction =
  | {
      type: "tasks/taskAdded";
      payload: {
        task: Pick<Task, "id" | "name"> & HourMinuteSecond;
      };
    }
  | {
      type: "tasks/selectedTaskUpdated";
      payload: {
        task: Pick<Task, "name"> & HourMinuteSecond;
      };
    }
  | {
      type: "tasks/selectedTaskRemoved";
    }
  | {
      type: "tasks/taskSelected";
      payload: {
        selectedTaskId: string;
      };
    }
  | {
      type: "tasks/selectedTaskStarted";
      payload: {
        newDeadlineTimeStampInSecond: number;
      };
    }
  | {
      type: "tasks/selectedTaskStopped";
    }
  | {
      type: "tasks/selectedTaskRan";
      payload: {
        newRemainingTimeInSecond: number;
      };
    }
  | {
      type: "tasks/selectedTaskReset";
      payload: {
        newDeadlineTimeStampInSecond: number | null;
      };
    };

type TasksProviderProps = {
  children?: ReactNode;
};

const TasksContext = createContext<Tasks | null>(null);
const TasksDispatchContext = createContext<Dispatch<TasksAction> | null>(null);

const initialTasks: Tasks = {
  tasks: [],
  selectedTaskId: null,
  selectedTaskDeadlineTimeStampInSecond: null,
};

export function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks(): Tasks {
  const tasks = useContext(TasksContext);

  if (tasks === null) {
    throw new Error("useTasks has to be used within TasksContext.Provider");
  }

  return tasks;
}

export function useTasksDispatch(): Dispatch<TasksAction> {
  const dispatch = useContext(TasksDispatchContext);

  if (dispatch === null) {
    throw new Error(
      "useTasksDispatch has to be used within TasksDispatchContext.Provider"
    );
  }

  return dispatch;
}

export function getSelectedTask({
  tasks,
  selectedTaskId,
  selectedTaskDeadlineTimeStampInSecond,
}: Tasks): SelectedTask | null {
  let selectedTask = tasks.find((task) => task.id === selectedTaskId);

  if (!selectedTask) {
    return null;
  }

  return {
    ...selectedTask,
    deadlineTimeStampInSecond: selectedTaskDeadlineTimeStampInSecond,
  };
}

function tasksReducer(state: Tasks, action: TasksAction): Tasks {
  switch (action.type) {
    case "tasks/taskAdded": {
      const { id, name, hour, minute, second } = action.payload.task;
      const inputTimeInSecond = convertHourMinuteSecondIntoSecond({
        hour,
        minute,
        second,
      });

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
    case "tasks/selectedTaskUpdated": {
      const { name, hour, minute, second } = action.payload.task;
      const inputTimeInSecond = convertHourMinuteSecondIntoSecond({
        hour,
        minute,
        second,
      });

      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === state.selectedTaskId
            ? {
                ...task,
                name,
                scheduledTimeInSecond: inputTimeInSecond,
                remainingTimeInSecond: inputTimeInSecond,
              }
            : task
        ),
      };
    }
    case "tasks/selectedTaskRemoved": {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== state.selectedTaskId),
        selectedTaskId: null,
      };
    }
    case "tasks/taskSelected": {
      const { selectedTaskId } = action.payload;

      return {
        ...state,
        selectedTaskId,
        selectedTaskDeadlineTimeStampInSecond: null,
      };
    }
    case "tasks/selectedTaskStarted": {
      const { newDeadlineTimeStampInSecond } = action.payload;

      return {
        ...state,
        selectedTaskDeadlineTimeStampInSecond: newDeadlineTimeStampInSecond,
      };
    }
    case "tasks/selectedTaskStopped": {
      return {
        ...state,
        selectedTaskDeadlineTimeStampInSecond: null,
      };
    }
    case "tasks/selectedTaskRan": {
      const { newRemainingTimeInSecond } = action.payload;

      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === state.selectedTaskId
            ? {
                ...task,
                remainingTimeInSecond: newRemainingTimeInSecond,
              }
            : task
        ),
        selectedTaskDeadlineTimeStampInSecond:
          newRemainingTimeInSecond > 0
            ? state.selectedTaskDeadlineTimeStampInSecond
            : null,
      };
    }
    case "tasks/selectedTaskReset": {
      const { newDeadlineTimeStampInSecond } = action.payload;

      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === state.selectedTaskId
            ? {
                ...task,
                remainingTimeInSecond: task.scheduledTimeInSecond,
              }
            : task
        ),
        selectedTaskDeadlineTimeStampInSecond: newDeadlineTimeStampInSecond,
      };
    }
    default: {
      throw new Error("Unknown action");
    }
  }
}
