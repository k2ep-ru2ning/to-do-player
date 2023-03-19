import PropTypes from "prop-types";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonGroup,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";

export default function RemoveTaskAlertModal({
  task,
  isOpen,
  onClose,
  onConfirm,
}) {
  const cancelButtonRef = useRef();

  return (
    <AlertDialog
      size={{ base: "sm", md: "md" }}
      leastDestructiveRef={cancelButtonRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>할 일 삭제하기</AlertDialogHeader>
        <AlertDialogBody>
          <Text>
            할 일(
            <Text as="span" fontWeight="bold">
              {task.name}
            </Text>
            )을 삭제합니다
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <ButtonGroup>
            <Button ref={cancelButtonRef} onClick={onClose}>
              취소
            </Button>
            <Button colorScheme="red" onClick={onConfirm}>
              삭제할래요
            </Button>
          </ButtonGroup>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

RemoveTaskAlertModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    scheduledTimeInSecond: PropTypes.number.isRequired,
    remainingTimeInSecond: PropTypes.number.isRequired,
  }).isRequired,
};
