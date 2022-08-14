import { memo } from "react";
import PropTypes from "prop-types";

function TimerTimeUnitDisplay({ timeUnit }) {
  return <div className="text-4xl font-bold text-center">{timeUnit}</div>;
}

TimerTimeUnitDisplay.propTypes = {
  timeUnit: PropTypes.string.isRequired,
};

export default memo(TimerTimeUnitDisplay);
