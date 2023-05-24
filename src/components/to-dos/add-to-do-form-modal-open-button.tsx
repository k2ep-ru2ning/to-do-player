import { Button, useDisclosure } from "@chakra-ui/react";

import AddToDoForm from "./add-to-do-form";
import ToDoFormModal from "./to-do-form-modal";

export default function AddToDoFormModalOpenButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme="main" variant="ghost">
        할 일 추가하기
      </Button>
      <ToDoFormModal title="할 일 추가하기" isOpen={isOpen} onClose={onClose}>
        <AddToDoForm onClose={onClose} />
      </ToDoFormModal>
    </>
  );
}
