import { useReducer } from "react";
import { convertTimeFromHourMinuteSecondToSecond } from "../utils/timeConvertor";
import SelectedTaskDetail from "./SelectedTaskDetail";
import OpenAddTaskFormModalButton from "./OpenAddTaskFormModalButton";
import WaitingTasks from "./WaitingTasks";
import FinishedTasks from "./FinishedTasks";
import { Flex } from "@chakra-ui/react";

export default function TasksManager() {
  const [state, dispatch] = useReducer(tasksReducer, {
    tasks: [],
    selectedTaskId: null,
    isTimerRunning: false,
  });

  const { tasks, selectedTaskId, isTimerRunning } = state;

  const waitingTasks = tasks.filter((task) => task.remainingTimeInSecond > 0);

  const finishedTasks = tasks.filter((task) => task.remainingTimeInSecond === 0);

  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

  return (
    <Flex direction="column" rowGap={6}>
      <SelectedTaskDetail
        selectedTask={selectedTask}
        isRunning={isTimerRunning}
        dispatch={dispatch}
      />
      <OpenAddTaskFormModalButton dispatch={dispatch} />
      <WaitingTasks
        waitingTasks={waitingTasks}
        selectedTaskId={selectedTaskId}
        dispatch={dispatch}
      />
      <FinishedTasks finishedTasks={finishedTasks} />
    </Flex>
  );
}

function tasksReducer(state, action) {
  switch (action.type) {
    case "added_new_task": {
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
    case "updated_selected_task": {
      const { name, hour, minute, second } = action.payload.task;
      const inputTimeInSecond = convertTimeFromHourMinuteSecondToSecond({ hour, minute, second });
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
            : task,
        ),
      };
    }
    case "removed_selected_task": {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== state.selectedTaskId),
        selectedTaskId: null,
      };
    }
    case "selected_task": {
      const { id } = action.payload.task;
      return {
        ...state,
        selectedTaskId: id,
        isTimerRunning: false,
      };
    }
    case "started_timer": {
      return {
        ...state,
        isTimerRunning: true,
      };
    }
    case "stopped_timer": {
      return {
        ...state,
        isTimerRunning: false,
      };
    }
    case "updated_timer": {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === state.selectedTaskId
            ? {
                ...task,
                remainingTimeInSecond: task.remainingTimeInSecond - 1,
              }
            : task,
        ),
      };
    }
    case "reset_timer": {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === state.selectedTaskId
            ? {
                ...task,
                remainingTimeInSecond: task.scheduledTimeInSecond,
              }
            : task,
        ),
      };
    }
    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
}
