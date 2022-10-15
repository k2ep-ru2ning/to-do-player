import { useReducer } from "react";
import { convertHourMinuteSecondIntoSecond } from "../utils/timeConvertor";
import SelectedTaskDetail from "./SelectedTaskDetail";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import Tasks from "./Tasks";
import OpenAddTaskFormModalButton from "./OpenAddTaskFormModalButton";

export default function TasksManager() {
  const [state, dispatch] = useReducer(tasksReducer, {
    tasks: [],
    selectedTaskId: null,
    isTimerRunning: false,
  });

  const { tasks, selectedTaskId, isTimerRunning } = state;

  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

  return (
    <Grid gap={4} templateColumns={{ md: "repeat(2, 1fr)", xl: "repeat(3, 1fr)" }}>
      <Flex direction="column" rowGap={4}>
        <Flex justifyContent="flex-end">
          <OpenAddTaskFormModalButton dispatch={dispatch} />
        </Flex>
        <SelectedTaskDetail
          selectedTask={selectedTask}
          isRunning={isTimerRunning}
          dispatch={dispatch}
        />
      </Flex>
      <GridItem colSpan={{ xl: 2 }}>
        <Tasks tasks={tasks} selectedTaskId={selectedTaskId} dispatch={dispatch} />
      </GridItem>
    </Grid>
  );
}

function tasksReducer(state, action) {
  switch (action.type) {
    case "tasks/taskAdded": {
      const { id, name, hour, minute, second } = action.payload.task;
      const inputTimeInSecond = convertHourMinuteSecondIntoSecond({ hour, minute, second });

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
      const inputTimeInSecond = convertHourMinuteSecondIntoSecond({ hour, minute, second });

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
        isTimerRunning: false,
      };
    }
    case "tasks/selectedTaskStarted": {
      return {
        ...state,
        isTimerRunning: true,
      };
    }
    case "tasks/selectedTaskStopped": {
      return {
        ...state,
        isTimerRunning: false,
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
            : task,
        ),
        isTimerRunning: newRemainingTimeInSecond > 0,
      };
    }
    case "tasks/selectedTaskReset": {
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
