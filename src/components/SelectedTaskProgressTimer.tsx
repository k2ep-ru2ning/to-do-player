import { useEffect } from "react";
import { ButtonGroup, IconButton, VStack } from "@chakra-ui/react";
import { IoPlaySharp, IoRefreshSharp, IoStopSharp } from "react-icons/io5";

import { type SelectedTask } from "../types/tasks";
import { useTasksDispatch } from "../contexts/TasksContext";
import { convertMSIntoSecond } from "../utils/time";
import TimerTime from "./TimerTime";

type SelectedTaskProgressTimerProps = {
  selectedTask: SelectedTask;
};

export default function SelectedTaskProgressTimer({
  selectedTask,
}: SelectedTaskProgressTimerProps) {
  const dispatch = useTasksDispatch();

  const {
    remainingTimeInSecond,
    scheduledTimeInSecond: resetTimeInSecond,
    deadlineTimeStampInSecond,
  } = selectedTask;

  const isRunning = deadlineTimeStampInSecond !== null;

  const canStartTimer = !isRunning && remainingTimeInSecond > 0;
  const canStopTimer = isRunning && remainingTimeInSecond > 0;
  const canResetTimer = remainingTimeInSecond > 0;

  const handleClickStartButton = (): void => {
    if (!canStartTimer) return;

    const newDeadlineTimeStampInSecond =
      getNowTimeStampInSecond() + remainingTimeInSecond;
    dispatch({
      type: "tasks/selectedTaskStarted",
      payload: { newDeadlineTimeStampInSecond },
    });
  };

  const handleClickStopButton = (): void => {
    if (!canStopTimer) return;

    dispatch({ type: "tasks/selectedTaskStopped" });
  };

  const handleClickResetButton = (): void => {
    if (!canResetTimer) return;

    const newDeadlineTimeStampInSecond = isRunning
      ? getNowTimeStampInSecond() + resetTimeInSecond
      : null;
    dispatch({
      type: "tasks/selectedTaskReset",
      payload: { newDeadlineTimeStampInSecond },
    });
  };

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      let newRemainingTimeInSecond =
        deadlineTimeStampInSecond - getNowTimeStampInSecond();
      if (newRemainingTimeInSecond < 0) {
        newRemainingTimeInSecond = 0;
      }
      dispatch({
        type: "tasks/selectedTaskRan",
        payload: { newRemainingTimeInSecond },
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [deadlineTimeStampInSecond, isRunning]);

  return (
    <VStack spacing={4}>
      <TimerTime timeInSecond={remainingTimeInSecond} />
      <ButtonGroup spacing={4}>
        {canStartTimer ? (
          <IconButton
            rounded="full"
            aria-label="Start Timer"
            icon={<IoPlaySharp />}
            onClick={handleClickStartButton}
          />
        ) : null}
        {canStopTimer ? (
          <IconButton
            rounded="full"
            aria-label="Stop Timer"
            icon={<IoStopSharp />}
            onClick={handleClickStopButton}
          />
        ) : null}
        {canResetTimer ? (
          <IconButton
            rounded="full"
            aria-label="Reset Timer"
            icon={<IoRefreshSharp />}
            onClick={handleClickResetButton}
          />
        ) : null}
      </ButtonGroup>
    </VStack>
  );
}

function getNowTimeStampInSecond(): number {
  return convertMSIntoSecond(Date.now());
}
