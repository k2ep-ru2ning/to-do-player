import PropTypes from "prop-types";
import { memo, useCallback } from "react";
import FormattedTime from "./FormattedTime";
import { Flex, Text, VStack } from "@chakra-ui/react";

function TaskListItem({ task, isSelected, dispatch }) {
  const isFinished = task.remainingTimeInSecond === 0;

  const handleClickTask = useCallback(() => {
    dispatch({
      type: "selected_task",
      payload: {
        task: {
          id: task.id,
        },
      },
    });
  }, [task.id]);

  return (
    <Flex
      _hover={{ backgroundColor: "gray.100", cursor: "pointer" }}
      p={4}
      h={24}
      columnGap={4}
      alignItems="center"
      onClick={handleClickTask}
    >
      <Text flexGrow={1} flexShrink={0} fontWeight="bold">
        {task.name}
      </Text>
      <VStack spacing={1}>
        <FormattedTime prefix="계획 시간" timeInSecond={task.scheduledTimeInSecond} />
        {!isSelected && !isFinished && (
          <FormattedTime prefix="남은 시간" timeInSecond={task.remainingTimeInSecond} />
        )}
      </VStack>
    </Flex>
  );
}

TaskListItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    scheduledTimeInSecond: PropTypes.number.isRequired,
    remainingTimeInSecond: PropTypes.number.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default memo(TaskListItem);
