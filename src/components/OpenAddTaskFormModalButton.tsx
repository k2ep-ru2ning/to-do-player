import { Button, useDisclosure } from "@chakra-ui/react";
import { nanoid } from "nanoid";

import AddTaskForm from "./AddTaskForm";
import TaskFormModal from "./TaskFormModal";
import { type TasksDispatch } from "./TasksManager";

type OpenAddTaskFormModalButtonProps = {
  dispatch: TasksDispatch;
};

type AddTaskFormData = {
  name: string;
  time: [string, string, string];
};

export default function OpenAddTaskFormModalButton({
  dispatch,
}: OpenAddTaskFormModalButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = ({ name, time }: AddTaskFormData): void => {
    const [hour, minute, second] = time.map((t) => Number(t));
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
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="main" variant="ghost">
        할 일 추가하기
      </Button>
      <TaskFormModal isOpen={isOpen} onClose={onClose} title="할 일 추가하기">
        <AddTaskForm onSubmit={handleSubmit} />
      </TaskFormModal>
    </>
  );
}
