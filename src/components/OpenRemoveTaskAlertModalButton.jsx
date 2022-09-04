import PropTypes from "prop-types";
import { Button, useDisclosure } from "@chakra-ui/react";
import { useCallback } from "react";
import RemoveTaskAlertModal from "./RemoveTaskAlertModal";

export default function OpenRemoveTaskAlertModalButton({ task, dispatch }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleRemoveTask = useCallback(() => {
    dispatch({ type: "removed_selected_task" });
  }, []);

  return (
    <>
      <Button onClick={onOpen}>삭제하기</Button>
      <RemoveTaskAlertModal
        task={task}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleRemoveTask}
      />
    </>
  );
}

OpenRemoveTaskAlertModalButton.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    scheduledTimeInSecond: PropTypes.number.isRequired,
    remainingTimeInSecond: PropTypes.number.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
