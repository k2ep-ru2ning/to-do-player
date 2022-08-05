import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

export default function TodoList({ todoList = [] }) {
  return (
    <section className="space-y-4">
      <header className="text-lg font-bold">할 일 목록</header>
      <ul className="space-y-4">
        {todoList.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      scheduledTimeInSecond: PropTypes.number.isRequired,
      remainingTimeInSecond: PropTypes.number.isRequired,
    }),
  ),
};
