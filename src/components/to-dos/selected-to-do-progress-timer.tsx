import { useEffect, useRef } from "react";
import { ButtonGroup, IconButton, VStack } from "@chakra-ui/react";
import { IoPlaySharp, IoRefreshSharp, IoStopSharp } from "react-icons/io5";

import { type SelectedToDo, useToDosDispatch } from "../../contexts/to-dos";
import TimerTime from "./timer-time";
import CountdownTimer from "../../lib/countdown-timer";

type Props = {
  selectedToDo: SelectedToDo;
};

export default function SelectedToDoProgressTimer({ selectedToDo }: Props) {
  const { remainingTimeInSecond, scheduledTimeInSecond, status } = selectedToDo;

  const dispatch = useToDosDispatch();

  const countdownTimerRef = useRef<CountdownTimer | null>(null);

  const getCountdownTimer = (): CountdownTimer => {
    if (countdownTimerRef.current) {
      return countdownTimerRef.current;
    }

    countdownTimerRef.current = new CountdownTimer();
    return countdownTimerRef.current;
  };

  useEffect(() => {
    const countdownTimer = getCountdownTimer();

    countdownTimer.setOnTick((countdownInSecond) => {
      dispatch({
        type: "selectedToDoRan",
        payload: {
          newRemainingTimeInSecond: countdownInSecond,
        },
      });
    });

    countdownTimer.setOnFinish(() => {
      dispatch({ type: "selectedToDoFinished" });
    });
  }, [dispatch]);

  useEffect(() => {
    if (status === "ready" || status === "finished") return;

    const countdownTimer = getCountdownTimer();
    countdownTimer.start();

    return () => {
      countdownTimer.stop();
    };
  }, [status]);

  const handleClickStartButton = (): void => {
    if (status !== "ready") return;

    getCountdownTimer().schedule(remainingTimeInSecond);
    dispatch({ type: "selectedToDoStarted" });
  };

  const handleClickResetButton = (): void => {
    if (status !== "ready") return;

    dispatch({ type: "selectedToDoReset" });
  };

  const handleClickStopButton = (): void => {
    if (status !== "running") return;

    dispatch({ type: "selectedToDoStopped" });
  };

  const handleClickRestartButton = (): void => {
    if (status !== "running") return;

    const countdownTimer = getCountdownTimer();
    countdownTimer.stop();
    dispatch({ type: "selectedToDoReset" });
    countdownTimer.schedule(scheduledTimeInSecond);
    countdownTimer.start();
  };

  return (
    <VStack spacing={4}>
      <TimerTime timeInSecond={remainingTimeInSecond} />
      <ButtonGroup spacing={4}>
        {status === "ready" ? (
          <>
            <IconButton
              rounded="full"
              aria-label="타이머 시작"
              icon={<IoPlaySharp />}
              onClick={handleClickStartButton}
            />
            <IconButton
              rounded="full"
              aria-label="타이머 초기화"
              icon={<IoRefreshSharp />}
              onClick={handleClickResetButton}
            />
          </>
        ) : null}
        {status === "running" ? (
          <>
            <IconButton
              rounded="full"
              aria-label="타이머 정지"
              icon={<IoStopSharp />}
              onClick={handleClickStopButton}
            />
            <IconButton
              rounded="full"
              aria-label="타이머 재시작"
              icon={<IoRefreshSharp />}
              onClick={handleClickRestartButton}
            />
          </>
        ) : null}
      </ButtonGroup>
    </VStack>
  );
}
