import { Button, useDisclosure } from "@chakra-ui/react";

import AddTaskForm from "./AddTaskForm";
import TaskFormModal from "./TaskFormModal";

export default function AddTaskFormModalOpenButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme="main" variant="ghost">
        할 일 추가하기
      </Button>
      <TaskFormModal title="할 일 추가하기" isOpen={isOpen} onClose={onClose}>
        <AddTaskForm onClose={onClose} />
      </TaskFormModal>
    </>
  );
}
