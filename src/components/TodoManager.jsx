import { useCallback, useReducer } from "react";
import { nanoid } from "nanoid";
import TodoList from "./TodoList";
import NewTodoAddForm from "./NewTodoAddForm";
import { convertTimeFromHourMinuteSecondToSecond } from "../utils/timeConvertor";

export default function TodoManager() {
  const [todoList, dispatch] = useReducer(todoReducer, []);

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
    },
    [],
  );

  return (
    <>
      <NewTodoAddForm onSubmit={handleNewTodoAddFormSubmit} />
      <TodoList todoList={todoList} />
    </>
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
