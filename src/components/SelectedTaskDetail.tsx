import { ButtonGroup, Center, Heading, Text, VStack } from "@chakra-ui/react";

import DefaultMessage from "./DefaultMessage";
import UpdateSelectedTaskFormModalOpenButton from "./UpdateSelectedTaskFormModalOpenButton";
import RemoveSelectedTaskAlertModalOpenButton from "./RemoveSelectedTaskAlertModalOpenButton";
import SelectedTaskProgressTimer from "./SelectedTaskProgressTimer";
import { getSelectedTask, useTasks } from "../contexts/TasksContext";

export default function SelectedTaskDetail() {
  const tasks = useTasks();

  const selectedTask = getSelectedTask(tasks);

  if (selectedTask === null) {
    return (
      <Center h={{ base: 80, md: 96 }} p={4} borderWidth={2} borderRadius="lg">
        <DefaultMessage message="할 일 목록에서 할 일을 선택하세요" />
      </Center>
    );
  }

  const isSelectedTaskFinished = selectedTask.remainingTimeInSecond === 0;

  const isSelectedTaskRunning = selectedTask.deadlineTimeStampInSecond !== null;

  return (
    <Center h={{ base: 80, md: 96 }} p={4} borderWidth={2} borderRadius="lg">
      <VStack spacing={4}>
        <ButtonGroup isDisabled={isSelectedTaskRunning} variant="ghost">
          {!isSelectedTaskFinished ? (
            <UpdateSelectedTaskFormModalOpenButton
              selectedTask={selectedTask}
            />
          ) : null}
          <RemoveSelectedTaskAlertModalOpenButton selectedTask={selectedTask} />
        </ButtonGroup>
        <Heading textAlign="center" fontSize="2xl" fontWeight="bold">
          {selectedTask.name}
        </Heading>
        {isSelectedTaskFinished ? (
          <Text textAlign="center" fontSize="2xl" fontWeight="bold">
            할 일을 완료했습니다!
          </Text>
        ) : (
          <SelectedTaskProgressTimer selectedTask={selectedTask} />
        )}
      </VStack>
    </Center>
  );
}
