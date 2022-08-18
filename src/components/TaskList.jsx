import PropTypes from "prop-types";
import TaskListItem from "./TaskListItem";

export default function TaskList({ tasks, dispatch }) {
  return (
    <section className="space-y-4">
      <header className="text-lg font-bold">할 일 목록</header>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <TaskListItem key={task.id} task={task} dispatch={dispatch} />
        ))}
      </ul>
    </section>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      scheduledTimeInSecond: PropTypes.number.isRequired,
      remainingTimeInSecond: PropTypes.number.isRequired,
    }),
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};
