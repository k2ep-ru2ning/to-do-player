import PropTypes from "prop-types";
import TaskAddForm from "./TaskAddForm";
import { useCallback } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export default function TaskAddFormModal({ isOpen, onClose, onSubmit }) {
  const handleSubmit = useCallback(({ name, time: [hour, minute, second] }) => {
    onSubmit({
      name,
      hour: Number(hour),
      minute: Number(minute),
      second: Number(second),
    });
    onClose();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", md: "md" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>새 할 일 추가하기</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TaskAddForm onSubmit={handleSubmit} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

TaskAddFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
