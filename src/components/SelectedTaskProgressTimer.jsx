import { ButtonGroup, IconButton, VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useCallback, useEffect } from "react";
import { IoPlaySharp, IoRefreshSharp, IoStopSharp } from "react-icons/io5";
import TimerTime from "./TimerTime";

export default function SelectedTaskProgressTimer({ remainingTimeInSecond, isRunning, dispatch }) {
  const canStartTimer = !isRunning && remainingTimeInSecond > 0;
  const canStopTimer = isRunning && remainingTimeInSecond > 0;
  const canResetTimer = remainingTimeInSecond > 0;

  const handleClickStartButton = useCallback(() => {
    if (!canStartTimer) return;

    dispatch({ type: "tasks/selectedTaskStarted" });
  }, [canStartTimer]);

  const handleClickStopButton = useCallback(() => {
    if (!canStopTimer) return;

    dispatch({ type: "tasks/selectedTaskStopped" });
  }, [canStopTimer]);

  const handleClickResetButton = useCallback(() => {
    if (!canResetTimer) return;

    dispatch({ type: "tasks/selectedTaskReset" });
  }, [canResetTimer]);

  useEffect(() => {
    if (!isRunning) return;

    if (remainingTimeInSecond > 0) {
      const timerId = setTimeout(
        () =>
          dispatch({
            type: "tasks/selectedTaskRan",
            payload: { newRemainingTimeInSecond: remainingTimeInSecond - 1 },
          }),
        1000,
      );
      return () => clearTimeout(timerId);
    }
  }, [isRunning, remainingTimeInSecond]);

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

SelectedTaskProgressTimer.propTypes = {
  remainingTimeInSecond: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};
