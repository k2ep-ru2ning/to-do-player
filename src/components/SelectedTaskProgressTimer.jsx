import { ButtonGroup, IconButton, VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useCallback, useEffect } from "react";
import { IoPlaySharp, IoRefreshSharp, IoStopSharp } from "react-icons/io5";
import { convertMSIntoSecond } from "../utils/time";
import TimerTime from "./TimerTime";

export default function SelectedTaskProgressTimer({
  remainingTimeInSecond,
  resetTimeInSecond,
  deadlineTimeStampInSecond,
  dispatch,
}) {
  const isRunning = deadlineTimeStampInSecond !== null;

  const canStartTimer = !isRunning && remainingTimeInSecond > 0;
  const canStopTimer = isRunning && remainingTimeInSecond > 0;
  const canResetTimer = remainingTimeInSecond > 0;

  const handleClickStartButton = useCallback(() => {
    if (!canStartTimer) return;

    const newDeadlineTimeStampInSecond =
      getNowTimeStampInSecond() + remainingTimeInSecond;
    dispatch({
      type: "tasks/selectedTaskStarted",
      payload: { newDeadlineTimeStampInSecond },
    });
  }, [canStartTimer, remainingTimeInSecond]);

  const handleClickStopButton = useCallback(() => {
    if (!canStopTimer) return;

    dispatch({ type: "tasks/selectedTaskStopped" });
  }, [canStopTimer]);

  const handleClickResetButton = useCallback(() => {
    if (!canResetTimer) return;

    const newDeadlineTimeStampInSecond = isRunning
      ? getNowTimeStampInSecond() + resetTimeInSecond
      : null;
    dispatch({
      type: "tasks/selectedTaskReset",
      payload: { newDeadlineTimeStampInSecond },
    });
  }, [canResetTimer, isRunning, resetTimeInSecond]);

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

function getNowTimeStampInSecond() {
  return convertMSIntoSecond(Date.now());
}

SelectedTaskProgressTimer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  remainingTimeInSecond: PropTypes.number.isRequired,
  resetTimeInSecond: PropTypes.number.isRequired,
  deadlineTimeStampInSecond: PropTypes.number,
};
