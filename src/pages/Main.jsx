import TasksManager from "../components/TasksManager";
import Timer from "../components/Timer";
import { TasksProvider } from "../context/TasksContext";

export default function Main() {
  return (
    <>
      <div>Main Page</div>
      <Timer initialTimeInSecond={3600} />
      <TasksProvider>
        <TasksManager />
      </TasksProvider>
    </>
  );
}
