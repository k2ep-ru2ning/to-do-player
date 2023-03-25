import { Button, useDisclosure } from "@chakra-ui/react";

import { type TasksDispatch } from "./TasksManager";
import AddTaskForm from "./AddTaskForm";
import TaskFormModal from "./TaskFormModal";

type OpenAddTaskFormModalButtonProps = {
  dispatch: TasksDispatch;
};

export default function OpenAddTaskFormModalButton({
  dispatch,
}: OpenAddTaskFormModalButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme="main" variant="ghost">
        할 일 추가하기
      </Button>
      <TaskFormModal title="할 일 추가하기" isOpen={isOpen} onClose={onClose}>
        <AddTaskForm dispatch={dispatch} onClose={onClose} />
      </TaskFormModal>
    </>
  );
}
