import { useReducer } from "react";
import { convertTimeFromHourMinuteSecondToSecond } from "../utils/timeConvertor";
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
      const { updatedTimeInSecond } = action.payload.timer;

      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === state.selectedTaskId
            ? {
                ...task,
                remainingTimeInSecond: updatedTimeInSecond,
              }
            : task,
        ),
        isTimerRunning: updatedTimeInSecond > 0,
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
