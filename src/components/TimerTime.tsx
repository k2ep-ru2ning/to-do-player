import { Flex } from "@chakra-ui/react";

import {
  convertSecondIntoHourMinuteSecond,
  formatTimeUnit,
} from "../utils/time";
import TimerTimeUnit from "./TimerTimeUnit";

type Props = {
  timeInSecond: number;
};

export default function TimerTime({ timeInSecond }: Props) {
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
