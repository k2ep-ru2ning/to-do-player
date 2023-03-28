import { Box } from "@chakra-ui/react";

type TimerTimeUnitProps = {
  timeUnit: string;
};

export default function TimerTimeUnit({ timeUnit }: TimerTimeUnitProps) {
  return (
    <Box fontSize="4xl" fontWeight="bold">
      {timeUnit}
    </Box>
  );
}
