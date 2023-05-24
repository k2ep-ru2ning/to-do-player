import { Flex, Text, VStack } from "@chakra-ui/react";

import FormattedTime from "./FormattedTime";
import {
  type ToDo,
  useToDos,
  useToDosDispatch,
} from "../contexts/ToDosContext";

type Props = {
  toDo: ToDo;
};

export default function ToDoListItem({ toDo }: Props) {
  const dispatch = useToDosDispatch();

  const { selectedItemId } = useToDos();

  const isFinished = toDo.remainingTimeInSecond === 0;

  const isSelected = selectedItemId === toDo.id;

  const handleClickToDo = (): void => {
    dispatch({
      type: "toDoSelected",
      payload: {
        selectedItemId: toDo.id,
      },
    });
  };

  return (
    <Flex
      _hover={{ backgroundColor: "gray.100", cursor: "pointer" }}
      bgColor={isSelected ? "main.50" : undefined}
      p={4}
      h={24}
      columnGap={4}
      alignItems="center"
      onClick={handleClickToDo}
    >
      <Text flexGrow={1} fontWeight="bold" noOfLines={3}>
        {toDo.name}
      </Text>
      <VStack flexShrink={0} spacing={1}>
        <FormattedTime
          prefix="계획 시간"
          timeInSecond={toDo.scheduledTimeInSecond}
        />
        {!isSelected && !isFinished ? (
          <FormattedTime
            prefix="남은 시간"
            timeInSecond={toDo.remainingTimeInSecond}
          />
        ) : null}
      </VStack>
    </Flex>
  );
}
