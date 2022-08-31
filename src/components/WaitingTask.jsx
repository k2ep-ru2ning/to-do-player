import PropTypes from "prop-types";
import { useCallback } from "react";
import FormattedTime from "./FormattedTime";
import { Button, ButtonGroup, Flex, Text, useDisclosure, VStack } from "@chakra-ui/react";
import UpdateTaskFormModal from "./UpdateTaskFormModal";

export default function WaitingTask({ task, dispatch }) {
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
  }, [task.id]);

  return (
    <>
      <Flex
        _hover={{ backgroundColor: "gray.100" }}
        px={4}
        py={2}
        columnGap={4}
        alignItems="center"
      >
        <Text flexGrow={1} flexShrink={0} fontWeight="bold">
          {task.name}
        </Text>
        <VStack spacing={1}>
          <FormattedTime prefix="계획 시간" timeInSecond={task.scheduledTimeInSecond} />
          <FormattedTime prefix="남은 시간" timeInSecond={task.remainingTimeInSecond} />
        </VStack>
        <ButtonGroup size="sm" colorScheme="main" variant="ghost">
          <Button onClick={onOpenTaskUpdateFormModal}>수정하기</Button>
          <Button onClick={handleRemoveTask}>삭제하기</Button>
        </ButtonGroup>
      </Flex>
      <UpdateTaskFormModal
        isOpen={isTaskUpdateFormModalOpen}
        onClose={onCloseTaskUpdateFormModal}
        onSubmit={handleUpdateTask}
        task={task}
      />
    </>
  );
}

WaitingTask.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    scheduledTimeInSecond: PropTypes.number.isRequired,
    remainingTimeInSecond: PropTypes.number.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
