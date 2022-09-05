import { Box, Center, StackDivider, VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import DefaultMessage from "./DefaultMessage";
import TaskListItem from "./TaskListItem";

export default function TaskList({ tasks, emptyMessage, selectedTaskId, dispatch }) {
  return (
    <Box h="389px" overflowY="auto" borderWidth={1} borderRadius="md">
      {tasks.length === 0 ? (
        <Center h="full">
          <DefaultMessage>{emptyMessage}</DefaultMessage>
        </Center>
      ) : (
        <VStack divider={<StackDivider />} align="stretch" spacing={0}>
          {tasks.map((task) => (
            <TaskListItem
              key={task.id}
              task={task}
              isSelected={task.id === selectedTaskId}
              dispatch={dispatch}
            />
          ))}
        </VStack>
      )}
    </Box>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      scheduledTimeInSecond: PropTypes.number.isRequired,
      remainingTimeInSecond: PropTypes.number.isRequired,
    }),
  ).isRequired,
  emptyMessage: PropTypes.string.isRequired,
  selectedTaskId: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};
