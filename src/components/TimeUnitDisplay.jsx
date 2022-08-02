import { memo } from "react";
import PropTypes from "prop-types";

function TimeUnitDisplay({ timeUnit }) {
  return <div className="text-4xl font-bold text-center">{timeUnit}</div>;
}

TimeUnitDisplay.propTypes = {
  timeUnit: PropTypes.string.isRequired,
};

export default memo(TimeUnitDisplay);
