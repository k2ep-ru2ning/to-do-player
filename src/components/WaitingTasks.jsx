import { Flex, Heading, List, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import WaitingTaskListItem from "./WaitingTaskListItem";

export default function WaitingTasks({ tasks, dispatch }) {
  const waitingTasks = tasks.filter((task) => task.remainingTimeInSecond > 0);

  return (
    <Flex as="section" direction="column" rowGap={4}>
      <header>
        <Heading as="h2" size="md">
          할 일 목록
        </Heading>
      </header>
      {waitingTasks.length === 0 ? (
        <Text fontSize="lg" color="gray.700" px={2} py={4} textAlign="center">
          할 일 추가하기 버튼을 눌러 할 일을 추가하세요.
        </Text>
      ) : (
        <List spacing={4}>
          {waitingTasks.map((task) => (
            <WaitingTaskListItem key={task.id} task={task} dispatch={dispatch} />
          ))}
        </List>
      )}
    </Flex>
  );
}

WaitingTasks.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      scheduledTimeInSecond: PropTypes.number.isRequired,
      remainingTimeInSecond: PropTypes.number.isRequired,
    }),
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};
