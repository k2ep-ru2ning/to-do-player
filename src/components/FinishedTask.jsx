import { Flex, Text, VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import FormattedTime from "./FormattedTime";

export default function FinishedTask({ task }) {
  return (
    <Flex px={4} py={2} columnGap={4} alignItems="center">
      <Text flexGrow={1} flexShrink={0} fontWeight="bold">
        {task.name}
      </Text>
      <VStack spacing={1}>
        <FormattedTime prefix="계획 시간" timeInSecond={task.scheduledTimeInSecond} />
      </VStack>
    </Flex>
  );
}

FinishedTask.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    scheduledTimeInSecond: PropTypes.number.isRequired,
    remainingTimeInSecond: PropTypes.number.isRequired,
  }),
};
