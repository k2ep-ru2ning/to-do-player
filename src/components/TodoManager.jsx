import { useCallback, useReducer } from "react";
import { nanoid } from "nanoid";
import TodoList from "./TodoList";
import { convertTimeFromHourMinuteSecondToSecond } from "../utils/timeConvertor";
import useModal from "../hooks/useModal";
import NewTodoAddFormModal from "./NewTodoAddFormModal";

export default function TodoManager() {
  const [todoList, dispatch] = useReducer(todoReducer, []);

  const { isModalOpen, openModal, closeModal } = useModal();

  const handleNewTodoAddFormSubmit = useCallback(
    ({ todoName, todoTimeHour, todoTimeMinute, todoTimeSecond }) => {
      const inputTimeInSecond = convertTimeFromHourMinuteSecondToSecond({
        hour: Number(todoTimeHour),
        minute: Number(todoTimeMinute),
        second: Number(todoTimeSecond),
      });

      const payload = {
        id: nanoid(),
        name: todoName,
        scheduledTimeInSecond: inputTimeInSecond,
        remainingTimeInSecond: inputTimeInSecond,
      };

      dispatch({
        type: "added",
        payload,
      });

      closeModal();
    },
    [closeModal],
  );

  return (
    <div className="relative">
      <button className="absolute top-0 right-0 btn primary-btn text-sm" onClick={openModal}>
        할 일 추가하기
      </button>
      <TodoList todoList={todoList} />
      <NewTodoAddFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleNewTodoAddFormSubmit}
      />
    </div>
  );
}

function todoReducer(state, action) {
  switch (action.type) {
    case "added": {
      return [...state, action.payload];
    }
    default: {
      throw new Error(`Unknown action: ${action.type}`);
    }
  }
}
