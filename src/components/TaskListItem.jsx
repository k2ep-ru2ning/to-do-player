import PropTypes from "prop-types";
import { convertTimeFromSecondToHourMinuteSecond } from "../utils/timeConvertor";
import { formatTime } from "../utils/timeFormatter";

export default function TaskListItem({ task }) {
  const { name, scheduledTimeInSecond, remainingTimeInSecond } = task;

  const formattedScheduledTime = formatTime(
    convertTimeFromSecondToHourMinuteSecond(scheduledTimeInSecond),
  );

  const formattedRemainingTime = formatTime(
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

TaskListItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    scheduledTimeInSecond: PropTypes.number.isRequired,
    remainingTimeInSecond: PropTypes.number.isRequired,
  }).isRequired,
};
