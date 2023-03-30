import { Button, useDisclosure } from "@chakra-ui/react";

import UpdateSelectedTaskForm from "./UpdateSelectedTaskForm";
import TaskFormModal from "./TaskFormModal";
import { type SelectedTask } from "../types/tasks";

type UpdateSelectedTaskFormModalOpenButtonProps = {
  selectedTask: SelectedTask;
};

export default function UpdateSelectedTaskFormModalOpenButton({
  selectedTask,
}: UpdateSelectedTaskFormModalOpenButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme="main">
        수정하기
      </Button>
      <TaskFormModal title="할 일 수정하기" isOpen={isOpen} onClose={onClose}>
        <UpdateSelectedTaskForm selectedTask={selectedTask} onClose={onClose} />
      </TaskFormModal>
    </>
  );
}
