import PropTypes from "prop-types";
import { convertTimeFromSecondToHourMinuteSecond } from "../utils/timeConvertor";

export default function TodoItem({ todo }) {
  const { name, scheduledTimeInSecond, remainingTimeInSecond } = todo;

  const formattedScheduledTime = timeFormat(
    convertTimeFromSecondToHourMinuteSecond(scheduledTimeInSecond),
  );

  const formattedRemainingTime = timeFormat(
    convertTimeFromSecondToHourMinuteSecond(remainingTimeInSecond),
  );

  return (
    <li className="flex items-center px-4 py-3 bg-gray-100 rounded-lg">
      <div className="w-1/4">{name}</div>
      <div className="space-y-1">
        <div>계획 시간: {formattedScheduledTime}</div>
        <div>남은 시간: {formattedRemainingTime}</div>
      </div>
    </li>
  );
}

function timeFormat({ hour = -1, minute = -1, second = -1 }) {
  if (hour < 0 || minute < 0 || second < 0) {
    throw new Error("time is invalid.");
  }

  const prefix = "0";
  const hh = hour < 10 ? prefix + hour : "" + hour;
  const mm = minute < 10 ? prefix + minute : "" + minute;
  const ss = second < 10 ? prefix + second : "" + second;

  return `${hh}:${mm}:${ss}`;
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    scheduledTimeInSecond: PropTypes.number.isRequired,
    remainingTimeInSecond: PropTypes.number.isRequired,
  }).isRequired,
};
