import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type TaskFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function TaskFormModal({
  isOpen,
  onClose,
  title,
  children,
}: TaskFormModalProps) {
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
