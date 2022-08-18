import PropTypes from "prop-types";
import ScheduledTaskListItem from "./ScheduledTaskListItem";

export default function ScheduledTasks({ tasks, dispatch }) {
  const scheduledTasks = tasks.filter((task) => task.remainingTimeInSecond > 0);

  return (
    <section className="space-y-4">
      <header>
        <h2 className="text-lg font-bold">할 일 목록</h2>
      </header>
      {scheduledTasks.length === 0 ? (
        <div className="px-4 py-10 text-gray-700 text-center">
          <span className="text-indigo-500">할 일 추가하기</span> 버튼을 눌러 할 일을 추가하세요.
        </div>
      ) : (
        <ul className="space-y-4">
          {scheduledTasks.map((task) => (
            <ScheduledTaskListItem key={task.id} task={task} dispatch={dispatch} />
          ))}
        </ul>
      )}
    </section>
  );
}

ScheduledTasks.propTypes = {
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
