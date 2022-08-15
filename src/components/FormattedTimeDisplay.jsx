import PropTypes from "prop-types";
import { memo } from "react";
import { convertTimeFromSecondToHourMinuteSecond } from "../utils/timeConvertor";
import { formatTime } from "../utils/timeFormatter";

function FormattedTimeDisplay({ prefix, timeInSecond }) {
  const formattedTime = formatTime(convertTimeFromSecondToHourMinuteSecond(Number(timeInSecond)));

  return (
    <div className="flex gap-2">
      {prefix ? <span>{prefix}</span> : null}
      {formattedTime}
    </div>
  );
}

FormattedTimeDisplay.propTypes = {
  prefix: PropTypes.string,
  timeInSecond: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default memo(FormattedTimeDisplay);
