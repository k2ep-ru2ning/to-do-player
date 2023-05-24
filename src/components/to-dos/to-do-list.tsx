import { Box, Center, StackDivider, VStack } from "@chakra-ui/react";

import { type ToDo } from "../../contexts/to-dos";
import DefaultMessage from "../default-message";
import ToDoListItem from "./to-do-list-item";

type Props = {
  toDos: ToDo[];
  emptyMessage: string;
};

export default function ToDoList({ toDos, emptyMessage }: Props) {
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
