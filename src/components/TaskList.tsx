import { Box, Center, StackDivider, VStack } from "@chakra-ui/react";

import DefaultMessage from "./DefaultMessage";
import TaskListItem from "./TaskListItem";
import { type TasksDispatch, type TasksState } from "./TasksManager";

type TaskListProps = Pick<TasksState, "tasks" | "selectedTaskId"> & {
  emptyMessage: string;
  dispatch: TasksDispatch;
};

export default function TaskList({
  tasks,
  emptyMessage,
  selectedTaskId,
  dispatch,
}: TaskListProps) {
  return (
    <Box
      h={{ base: "391px", md: "585px" }}
      overflowY="auto"
      borderWidth={2}
      borderRadius="lg"
    >
      {tasks.length === 0 ? (
        <Center h="full">
          <DefaultMessage message={emptyMessage} />
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
