import PropTypes from "prop-types";
import { Button, ButtonGroup, Center, Text, useDisclosure, VStack } from "@chakra-ui/react";
import DefaultMessage from "./DefaultMessage";
import { useCallback } from "react";
import UpdateTaskFormModal from "./UpdateTaskFormModal";

export default function SelectedTaskDetail({ task, dispatch }) {
  const {
    isOpen: isTaskUpdateFormModalOpen,
    onOpen: onOpenTaskUpdateFormModal,
    onClose: onCloseTaskUpdateFormModal,
  } = useDisclosure();

  const handleUpdateTask = useCallback(({ id, name, hour, minute, second }) => {
    dispatch({
      type: "updated",
      payload: {
        task: { id, name, hour, minute, second },
      },
    });
  }, []);

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
        <>
          <VStack>
            <Text fontSize="3xl" fontWeight="bold">
              {task.name}
            </Text>
            <ButtonGroup size="sm">
              <Button onClick={onOpenTaskUpdateFormModal}>수정하기</Button>
              <Button onClick={handleRemoveTask}>삭제하기</Button>
            </ButtonGroup>
          </VStack>
          <UpdateTaskFormModal
            isOpen={isTaskUpdateFormModalOpen}
            onClose={onCloseTaskUpdateFormModal}
            onSubmit={handleUpdateTask}
            task={task}
          />
        </>
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
