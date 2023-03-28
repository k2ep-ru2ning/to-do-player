import { Flex } from "@chakra-ui/react";

import {
  convertSecondIntoHourMinuteSecond,
  formatTimeUnit,
} from "../utils/time";
import TimerTimeUnit from "./TimerTimeUnit";

type TimerTimeProps = {
  timeInSecond: number;
};

export default function TimerTime({ timeInSecond }: TimerTimeProps) {
  const { hour, minute, second } =
    convertSecondIntoHourMinuteSecond(timeInSecond);

  const HH = formatTimeUnit(hour);
  const MM = formatTimeUnit(minute);
  const SS = formatTimeUnit(second);

  return (
    <Flex alignItems="center" columnGap={1}>
      <TimerTimeUnit timeUnit={HH} />
      <TimerTimeUnit timeUnit={":"} />
      <TimerTimeUnit timeUnit={MM} />
      <TimerTimeUnit timeUnit={":"} />
      <TimerTimeUnit timeUnit={SS} />
    </Flex>
  );
}
