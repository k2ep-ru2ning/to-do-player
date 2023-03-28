import { type Dispatch, useReducer } from "react";
import { ButtonGroup, Flex, Grid, GridItem } from "@chakra-ui/react";

import { convertHourMinuteSecondIntoSecond } from "../utils/time";
import SelectedTaskDetail from "./SelectedTaskDetail";
import TaskListTabs from "./TaskListTabs";
import OpenAddTaskFormModalButton from "./OpenAddTaskFormModalButton";

export type Task = {
  id: string;
  name: string;
  scheduledTimeInSecond: number;
  remainingTimeInSecond: number;
};

export type SelectedTask = Task & {
  deadlineTimeStampInSecond: number | null;
};

export type TasksState = {
  tasks: Task[];
  selectedTaskId: string | null;
  selectedTaskDeadlineTimeStampInSecond: number | null;
};

type TasksAction =
  | {
      type: "tasks/taskAdded";
      payload: {
        task: {
          id: string;
          name: string;
          hour: number;
          minute: number;
          second: number;
        };
      };
    }
  | {
      type: "tasks/selectedTaskUpdated";
      payload: {
        task: {
          name: string;
          hour: number;
          minute: number;
          second: number;
        };
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

export type TasksDispatch = Dispatch<TasksAction>;

export default function TasksManager() {
  const [state, dispatch] = useReducer(tasksReducer, {
    tasks: [],
    selectedTaskId: null,
    selectedTaskDeadlineTimeStampInSecond: null,
  });

  const { tasks, selectedTaskId, selectedTaskDeadlineTimeStampInSecond } =
    state;

  const selectedTask = getSelectedTask(
    tasks,
    selectedTaskId,
    selectedTaskDeadlineTimeStampInSecond
  );

  return (
    <Grid
      gap={4}
      templateColumns={{ md: "repeat(2, 1fr)", xl: "repeat(3, 1fr)" }}
    >
      <Flex direction="column" rowGap={4}>
        <ButtonGroup justifyContent="flex-end">
          <OpenAddTaskFormModalButton dispatch={dispatch} />
        </ButtonGroup>
        <SelectedTaskDetail selectedTask={selectedTask} dispatch={dispatch} />
      </Flex>
      <GridItem colSpan={{ xl: 2 }}>
        <TaskListTabs
          tasks={tasks}
          selectedTaskId={selectedTaskId}
          dispatch={dispatch}
        />
      </GridItem>
    </Grid>
  );
}

function getSelectedTask(
  tasks: Task[],
  selectedTaskId: string | null,
  selectedTaskDeadlineTimeStampInSecond: number | null
): SelectedTask | null {
  let selectedTask = tasks.find((task) => task.id === selectedTaskId);

  if (!selectedTask) {
    return null;
  }

  return {
    ...selectedTask,
    deadlineTimeStampInSecond: selectedTaskDeadlineTimeStampInSecond,
  };
}

function tasksReducer(state: TasksState, action: TasksAction): TasksState {
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
