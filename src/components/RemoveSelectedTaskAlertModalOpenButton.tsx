import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonGroup,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { type TasksDispatch, type SelectedTask } from "./TasksManager";

type RemoveSelectedTaskAlertModalOpenButtonProps = {
  selectedTask: SelectedTask;
  dispatch: TasksDispatch;
};

export default function RemoveSelectedTaskAlertModalOpenButton({
  selectedTask,
  dispatch,
}: RemoveSelectedTaskAlertModalOpenButtonProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClickRemoveButton = (): void => {
    dispatch({ type: "tasks/selectedTaskRemoved" });
  };

  return (
    <>
      <Button type="button" onClick={onOpen} colorScheme="red">
        삭제하기
      </Button>
      <AlertDialog
        size={{ base: "sm", md: "md" }}
        leastDestructiveRef={cancelButtonRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading fontSize="xl">할 일 삭제하기</Heading>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text>
              할 일을 삭제합니다 <br />
              (삭제할 할 일: <Text as="strong">{selectedTask.name}</Text>)
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup>
              <Button type="button" onClick={onClose} ref={cancelButtonRef}>
                취소
              </Button>
              <Button
                type="button"
                onClick={handleClickRemoveButton}
                colorScheme="red"
              >
                삭제하기
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
