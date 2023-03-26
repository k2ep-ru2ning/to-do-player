import { Button, useDisclosure } from "@chakra-ui/react";

import { type TasksDispatch, type SelectedTask } from "./TasksManager";
import UpdateSelectedTaskForm from "./UpdateSelectedTaskForm";
import TaskFormModal from "./TaskFormModal";
import { convertSecondIntoHourMinuteSecond } from "../utils/time";

type UpdateSelectedTaskFormModalOpenButtonProps = {
  selectedTask: SelectedTask;
  dispatch: TasksDispatch;
};

type UpdateSelectedTaskFormData = {
  name: string;
  time: [string, string, string];
};

export default function UpdateSelectedTaskFormModalOpenButton({
  selectedTask,
  dispatch,
}: UpdateSelectedTaskFormModalOpenButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = ({
    name,
    time: [hour, minute, second],
  }: UpdateSelectedTaskFormData): void => {
    dispatch({
      type: "tasks/selectedTaskUpdated",
      payload: {
        task: {
          name,
          hour: Number(hour),
          minute: Number(minute),
          second: Number(second),
        },
      },
    });
    onClose();
  };

  const defaultValues = getUpdateSelectedTaskFormDefaultValues(selectedTask);

  return (
    <>
      <Button onClick={onOpen} colorScheme="main">
        수정하기
      </Button>
      <TaskFormModal title="할 일 수정하기" isOpen={isOpen} onClose={onClose}>
        <UpdateSelectedTaskForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
        />
      </TaskFormModal>
    </>
  );
}

function getUpdateSelectedTaskFormDefaultValues(
  selectedTask: SelectedTask
): UpdateSelectedTaskFormData {
  const { name, scheduledTimeInSecond } = selectedTask;
  const { hour, minute, second } = convertSecondIntoHourMinuteSecond(
    scheduledTimeInSecond
  );

  return {
    name,
    time: [String(hour), String(minute), String(second)],
  };
}
