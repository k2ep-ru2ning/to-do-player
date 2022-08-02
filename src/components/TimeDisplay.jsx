import PropTypes from "prop-types";
import { convertTimeFromSecondToHourMinuteSecond } from "../utils/timeConvertor";

export default function TimeDisplay({ timeInSecond = 0 }) {
  const { hour, minute, second } = convertTimeFromSecondToHourMinuteSecond(timeInSecond);

  const HH = formatTimeUnit(hour);
  const MM = formatTimeUnit(minute);
  const SS = formatTimeUnit(second);

  return (
    <div>
      <div>{HH}</div>
      <div>:</div>
      <div>{MM}</div>
      <div>:</div>
      <div>{SS}</div>
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
