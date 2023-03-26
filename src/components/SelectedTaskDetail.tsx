import { ButtonGroup, Center, Heading, Text, VStack } from "@chakra-ui/react";

import DefaultMessage from "./DefaultMessage";
import OpenUpdateTaskFormModalButton from "./OpenUpdateTaskFormModalButton";
import OpenRemoveTaskAlertModalButton from "./OpenRemoveTaskAlertModalButton";
import SelectedTaskProgressTimer from "./SelectedTaskProgressTimer";
import { type SelectedTask, type TasksDispatch } from "./TasksManager";

type SelectedTaskDetailProps = {
  dispatch: TasksDispatch;
  selectedTask: SelectedTask | null;
};

export default function SelectedTaskDetail({
  selectedTask,
  dispatch,
}: SelectedTaskDetailProps) {
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
        <ButtonGroup size="sm" isDisabled={isSelectedTaskRunning}>
          {!isSelectedTaskFinished ? (
            <OpenUpdateTaskFormModalButton
              task={selectedTask}
              dispatch={dispatch}
            />
          ) : null}
          <OpenRemoveTaskAlertModalButton
            task={selectedTask}
            dispatch={dispatch}
          />
        </ButtonGroup>
        <Heading textAlign="center" fontSize="2xl" fontWeight="bold">
          {selectedTask.name}
        </Heading>
        {isSelectedTaskFinished ? (
          <Text textAlign="center" fontSize="2xl" fontWeight="bold">
            할 일을 완료했습니다!
          </Text>
        ) : (
          <SelectedTaskProgressTimer
            dispatch={dispatch}
            remainingTimeInSecond={selectedTask.remainingTimeInSecond}
            resetTimeInSecond={selectedTask.scheduledTimeInSecond}
            deadlineTimeStampInSecond={selectedTask.deadlineTimeStampInSecond}
          />
        )}
      </VStack>
    </Center>
  );
}
