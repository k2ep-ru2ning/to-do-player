import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { IoPlayCircleSharp, IoRefreshCircleSharp, IoStopCircleSharp } from "react-icons/io5";
import TimeDisplay from "./TimeDisplay";

export default function Timer({ initialTimeInSecond = 0 }) {
  const validatedInitialTimeInSecond = initialTimeInSecond < 0 ? 0 : initialTimeInSecond;

  const [remainingTimeInSecond, setRemainingTimeInSecond] = useState(validatedInitialTimeInSecond);

  const [status, setStatus] = useState(
    initialTimeInSecond > 0 ? timerStatus.READY : timerStatus.DONE,
  );

  const decreaseRemainingTimeInSecond = () =>
    setRemainingTimeInSecond((prevRemainingTime) => prevRemainingTime - UNIT_TIME_IN_SECOND);

  const canStart = status === timerStatus.READY;

  const canStop = status === timerStatus.RUNNING;

  const canReset = status !== timerStatus.DONE;

  useEffect(() => {
    if (status === timerStatus.RUNNING && remainingTimeInSecond <= 0) {
      setStatus(timerStatus.DONE);
    }
  }, [status, remainingTimeInSecond]);

  useEffect(() => {
    if (status !== timerStatus.RUNNING) {
      return;
    }

    if (remainingTimeInSecond <= 0) {
      return;
    }

    const timerId = setTimeout(decreaseRemainingTimeInSecond, UNIT_TIME_IN_SECOND * 1000);

    return () => clearTimeout(timerId);
  }, [status, remainingTimeInSecond]);

  const handleStartButtonClick = useCallback(() => {
    if (!canStart) {
      return;
    }

    setStatus(timerStatus.RUNNING);
  }, [canStart]);

  const handleStopButtonClick = useCallback(() => {
    if (!canStop) {
      return;
    }

    setStatus(timerStatus.READY);
  }, [canStop]);

  const handleResetButtonClick = useCallback(() => {
    if (!canReset) {
      return;
    }

    setRemainingTimeInSecond(validatedInitialTimeInSecond);
  }, [canReset, validatedInitialTimeInSecond]);

  return (
    <section className="p-4 flex flex-col gap-y-12 items-center">
      <header className="text-2xl font-bold">Timer</header>
      <TimeDisplay timeInSecond={remainingTimeInSecond} />
      <div className="flex gap-x-4 text-4xl text-indigo-500">
        {canStart ? (
          <button onClick={handleStartButtonClick}>
            <IoPlayCircleSharp />
          </button>
        ) : null}
        {canStop ? (
          <button onClick={handleStopButtonClick}>
            <IoStopCircleSharp />
          </button>
        ) : null}
        {canReset ? (
          <button onClick={handleResetButtonClick}>
            <IoRefreshCircleSharp />
          </button>
        ) : null}
      </div>
    </section>
  );
}

Timer.propTypes = {
  initialTimeInSecond: PropTypes.number,
};

const UNIT_TIME_IN_SECOND = 1;

const timerStatus = Object.freeze({
  READY: "ready",
  RUNNING: "running",
  DONE: "done",
});
