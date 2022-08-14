import { useTasks } from "../context/TasksContext";
import TaskListItem from "./TaskListItem";

export default function TaskList() {
  const tasks = useTasks();

  const { items: taskItems } = tasks;

  return (
    <section className="space-y-4">
      <header className="text-lg font-bold">할 일 목록</header>
      <ul className="space-y-4">
        {taskItems.map((item) => (
          <TaskListItem key={item.id} task={item} />
        ))}
      </ul>
    </section>
  );
}
