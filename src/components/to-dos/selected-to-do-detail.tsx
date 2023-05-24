import { ButtonGroup, Center, Heading, Text, VStack } from "@chakra-ui/react";

import DefaultMessage from "../default-message";
import UpdateSelectedToDoFormModalOpenButton from "./update-selected-to-do-form-modal-open-button";
import RemoveSelectedToDoAlertModalOpenButton from "./remove-selected-to-do-alert-modal-open-button";
import SelectedToDoProgressTimer from "./selected-to-do-progress-timer";
import { getSelectedToDo, useToDos } from "../../contexts/to-dos";

export default function SelectedToDoDetail() {
  const toDos = useToDos();

  const selectedToDo = getSelectedToDo(toDos);

  if (selectedToDo === null) {
    return (
      <Center h={{ base: 80, md: 96 }} p={4} borderWidth={2} borderRadius="lg">
        <DefaultMessage message="할 일 목록에서 할 일을 선택하세요" />
      </Center>
    );
  }

  const isSelectedToDoFinished = selectedToDo.remainingTimeInSecond === 0;

  const isSelectedToDoRunning = selectedToDo.deadlineTimeStampInSecond !== null;

  return (
    <Center h={{ base: 80, md: 96 }} p={4} borderWidth={2} borderRadius="lg">
      <VStack spacing={4}>
        <ButtonGroup isDisabled={isSelectedToDoRunning} variant="ghost">
          {!isSelectedToDoFinished ? (
            <UpdateSelectedToDoFormModalOpenButton
              selectedToDo={selectedToDo}
            />
          ) : null}
          <RemoveSelectedToDoAlertModalOpenButton selectedToDo={selectedToDo} />
        </ButtonGroup>
        <Heading textAlign="center" fontSize="2xl" fontWeight="bold">
          {selectedToDo.name}
        </Heading>
        {isSelectedToDoFinished ? (
          <Text textAlign="center" fontSize="2xl" fontWeight="bold">
            할 일을 완료했습니다!
          </Text>
        ) : (
          <SelectedToDoProgressTimer selectedToDo={selectedToDo} />
        )}
      </VStack>
    </Center>
  );
}
