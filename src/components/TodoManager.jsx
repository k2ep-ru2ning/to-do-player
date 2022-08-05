import { useState } from "react";
import { nanoid } from "nanoid";
import TodoList from "./TodoList";

const dummyData = [
  {
    id: nanoid(),
    name: "React Study",
    scheduledTimeInSecond: 4000,
    remainingTimeInSecond: 3200,
  },
  {
    id: nanoid(),
    name: "TypeScript Study",
    scheduledTimeInSecond: 3600,
    remainingTimeInSecond: 2000,
  },
];

export default function TodoManager() {
  const [todoList] = useState(dummyData);

  return <TodoList todoList={todoList} />;
}
