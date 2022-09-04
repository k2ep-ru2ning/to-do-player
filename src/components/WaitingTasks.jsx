import { Box, Center, Flex, Heading, StackDivider, VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import DefaultMessage from "./DefaultMessage";
import WaitingTask from "./WaitingTask";

export default function WaitingTasks({ waitingTasks, selectedTaskId, dispatch }) {
  return (
    <Flex as="section" direction="column" rowGap={4}>
      <header>
        <Heading as="h2" size="md">
          할 일 목록
        </Heading>
      </header>
      <Box h="389px" overflowY="auto" borderWidth={1} borderRadius="md">
        {waitingTasks.length === 0 ? (
          <Center h="full">
            <DefaultMessage>할 일 추가하기 버튼을 눌러 할 일을 추가하세요.</DefaultMessage>
          </Center>
        ) : (
          <VStack divider={<StackDivider />} align="stretch" spacing={0}>
            {waitingTasks.map((task) => (
              <WaitingTask
                key={task.id}
                task={task}
                isSelected={task.id === selectedTaskId}
                dispatch={dispatch}
              />
            ))}
          </VStack>
        )}
      </Box>
    </Flex>
  );
}

WaitingTasks.propTypes = {
  waitingTasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      scheduledTimeInSecond: PropTypes.number.isRequired,
      remainingTimeInSecond: PropTypes.number.isRequired,
    }),
  ).isRequired,
  selectedTaskId: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};
