import { Flex, Text, VStack } from "@chakra-ui/react";

import { type Task } from "../types/tasks";
import FormattedTime from "./FormattedTime";
import { useTasks, useTasksDispatch } from "../contexts/TasksContext";

type TaskListItemProps = {
  task: Task;
};

export default function TaskListItem({ task }: TaskListItemProps) {
  const dispatch = useTasksDispatch();

  const { selectedTaskId } = useTasks();

  const isFinished = task.remainingTimeInSecond === 0;

  const isSelected = selectedTaskId === task.id;

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
        {!isSelected && !isFinished ? (
          <FormattedTime
            prefix="남은 시간"
            timeInSecond={task.remainingTimeInSecond}
          />
        ) : null}
      </VStack>
    </Flex>
  );
}
