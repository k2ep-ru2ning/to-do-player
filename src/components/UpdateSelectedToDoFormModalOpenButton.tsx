import { Button, useDisclosure } from "@chakra-ui/react";

import UpdateSelectedToDoForm from "./UpdateSelectedToDoForm";
import ToDoFormModal from "./ToDoFormModal";
import { type SelectedToDo } from "../contexts/ToDosContext";

type Props = {
  selectedToDo: SelectedToDo;
};

export default function UpdateSelectedToDoFormModalOpenButton({
  selectedToDo,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme="main">
        수정하기
      </Button>
      <ToDoFormModal title="할 일 수정하기" isOpen={isOpen} onClose={onClose}>
        <UpdateSelectedToDoForm selectedToDo={selectedToDo} onClose={onClose} />
      </ToDoFormModal>
    </>
  );
}
