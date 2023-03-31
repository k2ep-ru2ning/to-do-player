import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { type ReactNode } from "react";

type ToDoFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export default function ToDoFormModal({
  isOpen,
  onClose,
  title,
  children,
}: ToDoFormModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", md: "md" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading fontSize="xl">{title}</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={6}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
