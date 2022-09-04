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
import UpdateTaskForm from "./UpdateTaskForm";

export default function UpdateTaskFormModal({ isOpen, onClose, onSubmit, task }) {
  const handleSubmit = useCallback(({ name, time: [hour, minute, second] }) => {
    onSubmit({
      name,
      hour: Number(hour),
      minute: Number(minute),
      second: Number(second),
    });
    onClose();
  }, []);

  const defaultValues = convertTaskToUpdateTaskFormDefaultValues(task);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", md: "md" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>할 일 수정하기</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <UpdateTaskForm onSubmit={handleSubmit} defaultValues={defaultValues} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

UpdateTaskFormModal.propTypes = {
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

function convertTaskToUpdateTaskFormDefaultValues(task) {
  const { name, scheduledTimeInSecond } = task;
  const { hour, minute, second } = convertTimeFromSecondToHourMinuteSecond(scheduledTimeInSecond);

  return {
    name,
    time: [hour, minute, second].map(String),
  };
}
