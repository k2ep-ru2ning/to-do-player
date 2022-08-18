import { memo } from "react";
import PropTypes from "prop-types";

function TimerTimeUnit({ timeUnit }) {
  return <div className="text-4xl font-bold text-center">{timeUnit}</div>;
}

TimerTimeUnit.propTypes = {
  timeUnit: PropTypes.string.isRequired,
};

export default memo(TimerTimeUnit);
