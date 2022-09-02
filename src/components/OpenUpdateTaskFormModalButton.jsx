import PropTypes from "prop-types";
import { Button, useDisclosure } from "@chakra-ui/react";
import { useCallback } from "react";
import UpdateTaskFormModal from "./UpdateTaskFormModal";

export default function OpenUpdateTaskFormModalButton({ task, dispatch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpdateTask = useCallback(({ id, name, hour, minute, second }) => {
    dispatch({
      type: "updated",
      payload: {
        task: { id, name, hour, minute, second },
      },
    });
  }, []);

  return (
    <>
      <Button onClick={onOpen}>수정하기</Button>
      <UpdateTaskFormModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleUpdateTask}
        task={task}
      />
    </>
  );
}

OpenUpdateTaskFormModalButton.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    scheduledTimeInSecond: PropTypes.number.isRequired,
    remainingTimeInSecond: PropTypes.number.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
