import TodoManager from "../components/TodoManager";
import Timer from "../components/Timer";

export default function Main() {
  return (
    <>
      <div>Main Page</div>
      <Timer initialTimeInSecond={3600} />
      <TodoManager />
    </>
  );
}
