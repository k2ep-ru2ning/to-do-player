import { HStack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import {
  convertSecondIntoHourMinuteSecond,
  formatTimeUnit,
} from "../utils/time";
import TimerTimeUnit from "./TimerTimeUnit";

export default function TimerTime({ timeInSecond = 0 }) {
  const { hour, minute, second } =
    convertSecondIntoHourMinuteSecond(timeInSecond);

  const HH = formatTimeUnit(hour);
  const MM = formatTimeUnit(minute);
  const SS = formatTimeUnit(second);

  return (
    <HStack>
      <TimerTimeUnit timeUnit={HH} />
      <TimerTimeUnit timeUnit={":"} />
      <TimerTimeUnit timeUnit={MM} />
      <TimerTimeUnit timeUnit={":"} />
      <TimerTimeUnit timeUnit={SS} />
    </HStack>
  );
}

TimerTime.propTypes = {
  timeInSecond: PropTypes.number,
};
