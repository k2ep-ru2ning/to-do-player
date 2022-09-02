import PropTypes from "prop-types";
import { Button, ButtonGroup, Center, Text, VStack } from "@chakra-ui/react";
import DefaultMessage from "./DefaultMessage";
import { useCallback } from "react";
import OpenUpdateTaskFormModalButton from "./OpenUpdateTaskFormModalButton";

export default function SelectedTaskDetail({ task, dispatch }) {
  const handleRemoveTask = useCallback(() => {
    dispatch({
      type: "removed",
      payload: {
        task: {
          id: task.id,
        },
      },
    });
  }, [task]);

  return (
    <Center height={80} p={4} borderWidth="1px" borderRadius="lg">
      {task ? (
        <VStack>
          <Text fontSize="3xl" fontWeight="bold">
            {task.name}
          </Text>
          <ButtonGroup size="sm">
            <OpenUpdateTaskFormModalButton task={task} dispatch={dispatch} />
            <Button onClick={handleRemoveTask}>삭제하기</Button>
          </ButtonGroup>
        </VStack>
      ) : (
        <DefaultMessage>할 일 목록에서 할 일을 선택하세요.</DefaultMessage>
      )}
    </Center>
  );
}

SelectedTaskDetail.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    scheduledTimeInSecond: PropTypes.number.isRequired,
    remainingTimeInSecond: PropTypes.number.isRequired,
  }),
  dispatch: PropTypes.func.isRequired,
};
