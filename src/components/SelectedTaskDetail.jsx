import PropTypes from "prop-types";
import { ButtonGroup, Center, Text, VStack } from "@chakra-ui/react";
import DefaultMessage from "./DefaultMessage";
import OpenUpdateTaskFormModalButton from "./OpenUpdateTaskFormModalButton";
import OpenRemoveTaskAlertModalButton from "./OpenRemoveTaskAlertModalButton";
import SelectedTaskProgressTimer from "./SelectedTaskProgressTimer";

export default function SelectedTaskDetail({ selectedTask, isRunning, dispatch }) {
  const isSelectedTaskFinished = selectedTask && selectedTask.remainingTimeInSecond === 0;

  return (
    <Center h={{ base: 72, md: 96 }} p={4} borderWidth={2} borderRadius="lg">
      {selectedTask ? (
        <VStack spacing={4}>
          <ButtonGroup size="sm" isDisabled={isRunning}>
            {!isSelectedTaskFinished && (
              <OpenUpdateTaskFormModalButton task={selectedTask} dispatch={dispatch} />
            )}
            <OpenRemoveTaskAlertModalButton task={selectedTask} dispatch={dispatch} />
          </ButtonGroup>
          <Text fontSize="3xl" fontWeight="bold">
            {selectedTask.name}
          </Text>
          {isSelectedTaskFinished ? (
            <Text fontSize="3xl" fontWeight="bold">
              할 일을 완료했습니다!
            </Text>
          ) : (
            <SelectedTaskProgressTimer
              remainingTimeInSecond={selectedTask.remainingTimeInSecond}
              isRunning={isRunning}
              dispatch={dispatch}
            />
          )}
        </VStack>
      ) : (
        <DefaultMessage>할 일 목록에서 할 일을 선택하세요</DefaultMessage>
      )}
    </Center>
  );
}

SelectedTaskDetail.propTypes = {
  selectedTask: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    scheduledTimeInSecond: PropTypes.number.isRequired,
    remainingTimeInSecond: PropTypes.number.isRequired,
  }),
  isRunning: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};
