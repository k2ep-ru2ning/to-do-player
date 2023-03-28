import { Button, useDisclosure } from "@chakra-ui/react";

import { type TasksDispatch, type SelectedTask } from "./TasksManager";
import UpdateSelectedTaskForm from "./UpdateSelectedTaskForm";
import TaskFormModal from "./TaskFormModal";

type UpdateSelectedTaskFormModalOpenButtonProps = {
  selectedTask: SelectedTask;
  dispatch: TasksDispatch;
};

export default function UpdateSelectedTaskFormModalOpenButton({
  selectedTask,
  dispatch,
}: UpdateSelectedTaskFormModalOpenButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme="main">
        수정하기
      </Button>
      <TaskFormModal title="할 일 수정하기" isOpen={isOpen} onClose={onClose}>
        <UpdateSelectedTaskForm
          selectedTask={selectedTask}
          onClose={onClose}
          dispatch={dispatch}
        />
      </TaskFormModal>
    </>
  );
}
