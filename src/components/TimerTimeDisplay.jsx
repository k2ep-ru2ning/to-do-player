import PropTypes from "prop-types";
import { convertTimeFromSecondToHourMinuteSecond } from "../utils/timeConvertor";
import { formatTimeUnit } from "../utils/timeFormatter";
import TimeUnitDisplay from "./TimeUnitDisplay";

export default function TimerTimeDisplay({ timeInSecond = 0 }) {
  const { hour, minute, second } = convertTimeFromSecondToHourMinuteSecond(timeInSecond);

  const HH = formatTimeUnit(hour);
  const MM = formatTimeUnit(minute);
  const SS = formatTimeUnit(second);

  return (
    <div className="flex gap-x-3">
      <TimeUnitDisplay timeUnit={HH} />
      <TimeUnitDisplay timeUnit={":"} />
      <TimeUnitDisplay timeUnit={MM} />
      <TimeUnitDisplay timeUnit={":"} />
      <TimeUnitDisplay timeUnit={SS} />
    </div>
  );
}

TimerTimeDisplay.propTypes = {
  timeInSecond: PropTypes.number,
};
