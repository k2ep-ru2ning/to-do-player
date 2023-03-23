import { Button, useDisclosure } from "@chakra-ui/react";
import { nanoid } from "nanoid";

import AddTaskFormModal from "./AddTaskFormModal";
import { type TasksDispatch } from "./TasksManager";

type OpenAddTaskFormModalButtonProps = {
  dispatch: TasksDispatch;
};

type NewTaskFormData = {
  name: string;
  hour: number;
  minute: number;
  second: number;
};

export default function OpenAddTaskFormModalButton({
  dispatch,
}: OpenAddTaskFormModalButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddTask = ({
    name,
    hour,
    minute,
    second,
  }: NewTaskFormData): void => {
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
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="main" variant="ghost">
        할 일 추가하기
      </Button>
      <AddTaskFormModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleAddTask}
      />
    </>
  );
}
