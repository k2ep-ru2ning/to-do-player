import PropTypes from "prop-types";
import { Box, Center, Flex, Heading, StackDivider, VStack } from "@chakra-ui/react";
import DefaultMessage from "./DefaultMessage";
import FinishedTask from "./FinishedTask";

export default function FinishedTasks({ finishedTasks }) {
  return (
    <Flex as="section" direction="column" rowGap={4}>
      <header>
        <Heading as="h2" size="md">
          완료 한 일
        </Heading>
      </header>
      <Box h={96} overflowY="auto" borderWidth={1} borderRadius="md">
        {finishedTasks.length === 0 ? (
          <Center h="full">
            <DefaultMessage>아직 완료된 일이 없습니다.</DefaultMessage>
          </Center>
        ) : (
          <VStack divider={<StackDivider />} align="stretch" spacing={0}>
            {finishedTasks.map((task) => (
              <FinishedTask key={task.id} task={task} />
            ))}
          </VStack>
        )}
      </Box>
    </Flex>
  );
}

FinishedTasks.propTypes = {
  finishedTasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      scheduledTimeInSecond: PropTypes.number.isRequired,
      remainingTimeInSecond: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
