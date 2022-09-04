import { ButtonGroup, IconButton, VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useCallback, useEffect } from "react";
import { IoPlaySharp, IoRefreshSharp, IoStopSharp } from "react-icons/io5";
import TimerTime from "./TimerTime";

export default function SelectedTaskProgressTimer({ selectedTask, isRunning, dispatch }) {
  const canStartTimer = !isRunning && selectedTask.remainingTimeInSecond > 0;
  const canStopTimer = isRunning && selectedTask.remainingTimeInSecond > 0;
  const canResetTimer = selectedTask.remainingTimeInSecond > 0;

  const handleClickStartButton = useCallback(() => {
    if (!canStartTimer) return;

    dispatch({ type: "started_timer" });
  }, [canStartTimer]);

  const handleClickStopButton = useCallback(() => {
    if (!canStopTimer) return;

    dispatch({ type: "stopped_timer" });
  }, [canStopTimer]);

  const handleClickResetButton = useCallback(() => {
    if (!canResetTimer) return;

    dispatch({ type: "reset_timer" });
  }, [canResetTimer]);

  useEffect(() => {
    if (!isRunning) return;

    if (selectedTask.remainingTimeInSecond > 0) {
      const timerId = setTimeout(() => dispatch({ type: "updated_timer" }), 1000);
      return () => clearTimeout(timerId);
    } else if (selectedTask.remainingTimeInSecond === 0) {
      dispatch({ type: "stopped_timer" });
    }
  }, [isRunning, selectedTask.remainingTimeInSecond]);

  return (
    <VStack spacing={4}>
      <TimerTime timeInSecond={selectedTask.remainingTimeInSecond} />
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
  selectedTask: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    scheduledTimeInSecond: PropTypes.number.isRequired,
    remainingTimeInSecond: PropTypes.number.isRequired,
  }).isRequired,
  isRunning: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};
