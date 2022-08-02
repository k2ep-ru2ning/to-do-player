import PropTypes from "prop-types";
import { convertTimeFromSecondToHourMinuteSecond } from "../utils/timeConvertor";
import TimeUnitDisplay from "./TimeUnitDisplay";

export default function TimeDisplay({ timeInSecond = 0 }) {
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

function formatTimeUnit(unit) {
  const prefix = unit < 10 ? "0" : "";
  return prefix + unit;
}

TimeDisplay.propTypes = {
  timeInSecond: PropTypes.number,
};
