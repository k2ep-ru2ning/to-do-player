import { Flex, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { memo } from "react";
import { convertTimeFromSecondToHourMinuteSecond } from "../utils/timeConvertor";
import { formatTime } from "../utils/timeFormatter";

function FormattedTime({ prefix, timeInSecond }) {
  const formattedTime = formatTime(convertTimeFromSecondToHourMinuteSecond(Number(timeInSecond)));

  return (
    <Flex alignItems="center" columnGap={2}>
      {prefix ? <Text>{prefix}</Text> : null}
      <Text>{formattedTime}</Text>
    </Flex>
  );
}

FormattedTime.propTypes = {
  prefix: PropTypes.string,
  timeInSecond: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default memo(FormattedTime);
