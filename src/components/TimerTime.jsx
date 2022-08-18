import PropTypes from "prop-types";
import { convertTimeFromSecondToHourMinuteSecond } from "../utils/timeConvertor";
import { formatTimeUnit } from "../utils/timeFormatter";
import TimerTimeUnit from "./TimerTimeUnit";

export default function TimerTime({ timeInSecond = 0 }) {
  const { hour, minute, second } = convertTimeFromSecondToHourMinuteSecond(timeInSecond);

  const HH = formatTimeUnit(hour);
  const MM = formatTimeUnit(minute);
  const SS = formatTimeUnit(second);

  return (
    <div className="flex gap-x-3">
      <TimerTimeUnit timeUnit={HH} />
      <TimerTimeUnit timeUnit={":"} />
      <TimerTimeUnit timeUnit={MM} />
      <TimerTimeUnit timeUnit={":"} />
      <TimerTimeUnit timeUnit={SS} />
    </div>
  );
}

TimerTime.propTypes = {
  timeInSecond: PropTypes.number,
};
