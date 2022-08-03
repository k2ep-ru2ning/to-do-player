import Timer from "../components/Timer";
import NewTodoAddForm from "../components/NewTodoAddForm";

export default function Main() {
  return (
    <>
      <div>Main Page</div>
      <NewTodoAddForm onSubmit={(data) => console.log(data)} />
      <Timer initialTimeInSecond={3600} />
    </>
  );
}
