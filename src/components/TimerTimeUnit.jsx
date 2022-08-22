import { memo } from "react";
import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";

function TimerTimeUnit({ timeUnit }) {
  return (
    <Box fontSize="4xl" fontWeight="bold">
      {timeUnit}
    </Box>
  );
}

TimerTimeUnit.propTypes = {
  timeUnit: PropTypes.string.isRequired,
};

export default memo(TimerTimeUnit);
