import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div>Home Page</div>
      <Link to={"/main"} className="bg-indigo-200 rounded p-1 text-indigo-600">
        시작하기
      </Link>
    </>
  );
}
