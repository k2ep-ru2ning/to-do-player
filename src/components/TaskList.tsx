import { Box, Center, StackDivider, VStack } from "@chakra-ui/react";

import { type Task } from "../types/tasks";
import DefaultMessage from "./DefaultMessage";
import TaskListItem from "./TaskListItem";

type TaskListProps = {
  tasks: Task[];
  emptyMessage: string;
};

export default function TaskList({ tasks, emptyMessage }: TaskListProps) {
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
            <TaskListItem key={task.id} task={task} />
          ))}
        </VStack>
      )}
    </Box>
  );
}
