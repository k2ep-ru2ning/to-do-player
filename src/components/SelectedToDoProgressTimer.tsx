import { useEffect } from "react";
import { ButtonGroup, IconButton, VStack } from "@chakra-ui/react";
import { IoPlaySharp, IoRefreshSharp, IoStopSharp } from "react-icons/io5";

import { type SelectedToDo, useToDosDispatch } from "../contexts/ToDosContext";
import { convertMSIntoSecond } from "../utils/time";
import TimerTime from "./TimerTime";

type Props = {
  selectedToDo: SelectedToDo;
};

export default function SelectedToDoProgressTimer({ selectedToDo }: Props) {
  const dispatch = useToDosDispatch();

  const {
    remainingTimeInSecond,
    scheduledTimeInSecond: resetTimeInSecond,
    deadlineTimeStampInSecond,
  } = selectedToDo;

  const isRunning = deadlineTimeStampInSecond !== null;

  const canStartTimer = !isRunning && remainingTimeInSecond > 0;
  const canStopTimer = isRunning && remainingTimeInSecond > 0;
  const canResetTimer = remainingTimeInSecond > 0;

  const handleClickStartButton = (): void => {
    if (!canStartTimer) return;

    const newDeadlineTimeStampInSecond =
      getNowTimeStampInSecond() + remainingTimeInSecond;
    dispatch({
      type: "selectedToDoStarted",
      payload: { newDeadlineTimeStampInSecond },
    });
  };

  const handleClickStopButton = (): void => {
    if (!canStopTimer) return;

    dispatch({ type: "selectedToDoStopped" });
  };

  const handleClickResetButton = (): void => {
    if (!canResetTimer) return;

    const newDeadlineTimeStampInSecond = isRunning
      ? getNowTimeStampInSecond() + resetTimeInSecond
      : null;
    dispatch({
      type: "selectedToDoReset",
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
        type: "selectedToDoRan",
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
