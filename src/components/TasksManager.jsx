import { useReducer } from "react";
import { convertTimeFromHourMinuteSecondToSecond } from "../utils/timeConvertor";
import SelectedTaskDetail from "./SelectedTaskDetail";
import OpenAddTaskFormModalButton from "./OpenAddTaskFormModalButton";
import { Flex, Heading } from "@chakra-ui/react";
import TaskList from "./TaskList";

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
      <Heading as="h2" fontSize="xl">
        할 일 목록
      </Heading>
      <TaskList
        tasks={waitingTasks}
        selectedTaskId={selectedTaskId}
        emptyMessage="할 일 추가하기 버튼을 눌러 할 일을 추가하세요"
        dispatch={dispatch}
      />
      <Heading as="h2" fontSize="xl">
        완료 한 일
      </Heading>
      <TaskList
        tasks={finishedTasks}
        selectedTaskId={selectedTaskId}
        emptyMessage="아직 완료된 일이 없습니다"
        dispatch={dispatch}
      />
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
