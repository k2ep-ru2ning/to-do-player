import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { convertTimeFromSecondToHourMinuteSecond } from "../utils/timeConvertor";
import TaskUpdateForm, { taskUpdateFormFieldName } from "./TaskUpdateForm";

export default function TaskUpdateFormModal({ isOpen, onClose, onSubmit, task }) {
  const handleSubmit = useCallback(
    (formInput) => {
      onSubmit({
        id: task.id,
        name: formInput[taskUpdateFormFieldName.NAME],
        hour: Number(formInput[taskUpdateFormFieldName.HOUR]),
        minute: Number(formInput[taskUpdateFormFieldName.MINUTE]),
        second: Number(formInput[taskUpdateFormFieldName.SECOND]),
      });
      onClose();
    },
    [task.id],
  );

  const defaultValues = convertTaskToTaskUpdateFormDefaultValues(task);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", md: "md" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>할 일 수정하기</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TaskUpdateForm onSubmit={handleSubmit} defaultValues={defaultValues} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

TaskUpdateFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    scheduledTimeInSecond: PropTypes.number.isRequired,
    remainingTimeInSecond: PropTypes.number.isRequired,
  }).isRequired,
};

function convertTaskToTaskUpdateFormDefaultValues(task) {
  const { name, scheduledTimeInSecond } = task;
  const { hour, minute, second } = convertTimeFromSecondToHourMinuteSecond(scheduledTimeInSecond);

  return {
    [taskUpdateFormFieldName.NAME]: name,
    [taskUpdateFormFieldName.HOUR]: hour,
    [taskUpdateFormFieldName.MINUTE]: minute,
    [taskUpdateFormFieldName.SECOND]: second,
  };
}
