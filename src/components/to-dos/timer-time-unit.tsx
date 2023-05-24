import { Box } from "@chakra-ui/react";

type Props = {
  timeUnit: string;
};

export default function TimerTimeUnit({ timeUnit }: Props) {
  return (
    <Box fontSize="4xl" fontWeight="bold">
      {timeUnit}
    </Box>
  );
}
