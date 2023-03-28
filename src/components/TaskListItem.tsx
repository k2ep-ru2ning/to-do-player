import { Flex, Text, VStack } from "@chakra-ui/react";

import FormattedTime from "./FormattedTime";
import { type TasksDispatch, type Task } from "./TasksManager";

type TaskListItemProps = {
  task: Task;
  isSelected: boolean;
  dispatch: TasksDispatch;
};

export default function TaskListItem({
  task,
  isSelected,
  dispatch,
}: TaskListItemProps) {
  const isFinished = task.remainingTimeInSecond === 0;

  const handleClickTask = (): void => {
    dispatch({
      type: "tasks/taskSelected",
      payload: {
        selectedTaskId: task.id,
      },
    });
  };

  return (
    <Flex
      _hover={{ backgroundColor: "gray.100", cursor: "pointer" }}
      p={4}
      h={24}
      columnGap={4}
      alignItems="center"
      onClick={handleClickTask}
    >
      <Text flexGrow={1} fontWeight="bold" noOfLines={3}>
        {task.name}
      </Text>
      <VStack flexShrink={0} spacing={1}>
        <FormattedTime
          prefix="계획 시간"
          timeInSecond={task.scheduledTimeInSecond}
        />
        {!isSelected && !isFinished && (
          <FormattedTime
            prefix="남은 시간"
            timeInSecond={task.remainingTimeInSecond}
          />
        )}
      </VStack>
    </Flex>
  );
}
