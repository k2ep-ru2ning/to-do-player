import PropTypes from "prop-types";
import { Button, useDisclosure } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { useCallback } from "react";
import AddTaskFormModal from "./AddTaskFormModal";

export default function OpenAddTaskFormModalButton({ dispatch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddTask = useCallback(({ name, hour, minute, second }) => {
    dispatch({
      type: "tasks/taskAdded",
      payload: {
        task: {
          id: nanoid(),
          name,
          hour,
          minute,
          second,
        },
      },
    });
  }, []);

  return (
    <>
      <Button onClick={onOpen} colorScheme="main" variant="ghost">
        할 일 추가하기
      </Button>
      <AddTaskFormModal isOpen={isOpen} onClose={onClose} onSubmit={handleAddTask} />
    </>
  );
}

OpenAddTaskFormModalButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
