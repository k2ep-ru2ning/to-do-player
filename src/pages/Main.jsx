import TasksManager from "../components/TasksManager";
import Timer from "../components/Timer";

export default function Main() {
  return (
    <>
      <div>Main Page</div>
      <Timer initialTimeInSecond={3600} />
      <TasksManager />
    </>
  );
}
