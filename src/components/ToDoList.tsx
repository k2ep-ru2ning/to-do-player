import { Box, Center, StackDivider, VStack } from "@chakra-ui/react";

import { type ToDo } from "../types/toDos";
import DefaultMessage from "./DefaultMessage";
import ToDoListItem from "./ToDoListItem";

type ToDoListProps = {
  toDos: ToDo[];
  emptyMessage: string;
};

export default function ToDoList({ toDos, emptyMessage }: ToDoListProps) {
  return (
    <Box
      h={{ base: "391px", md: "585px" }}
      overflowY="auto"
      borderWidth={2}
      borderRadius="lg"
    >
      {toDos.length === 0 ? (
        <Center h="full">
          <DefaultMessage message={emptyMessage} />
        </Center>
      ) : (
        <VStack divider={<StackDivider />} align="stretch" spacing={0}>
          {toDos.map((toDo) => (
            <ToDoListItem key={toDo.id} toDo={toDo} />
          ))}
        </VStack>
      )}
    </Box>
  );
}
