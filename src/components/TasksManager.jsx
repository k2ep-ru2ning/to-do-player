import { useCallback } from "react";
import { nanoid } from "nanoid";
import TaskList from "./TaskList";
import useModal from "../hooks/useModal";
import TaskAddFormModal from "./TaskAddFormModal";
import { useTasksDispatch } from "../context/TasksContext";
import { taskAddFormFieldName } from "./TaskAddForm";

export default function TasksManager() {
  const dispatch = useTasksDispatch();

  const { isModalOpen, openModal, closeModal } = useModal();

  const handleTaskAddFormSubmit = useCallback((taskAddFormInput) => {
    dispatch({
      type: "added",
      payload: {
        task: {
          id: nanoid(),
          name: taskAddFormInput[taskAddFormFieldName.NAME],
          hour: Number(taskAddFormInput[taskAddFormFieldName.HOUR]),
          minute: Number(taskAddFormInput[taskAddFormFieldName.MINUTE]),
          second: Number(taskAddFormInput[taskAddFormFieldName.SECOND]),
        },
      },
    });
    closeModal();
  }, []);

  return (
    <div className="relative">
      <button className="absolute top-0 right-0 btn primary-btn text-sm" onClick={openModal}>
        할 일 추가하기
      </button>
      <TaskList />
      <TaskAddFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleTaskAddFormSubmit}
      />
    </div>
  );
}
