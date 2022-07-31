import { Link } from "react-router-dom";

export default function HeaderBar() {
  return (
    <header className="h-16 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        FPS
      </Link>
      <nav>
        <ul className="flex gap-x-4">
          {navMenuList.map((menu) => (
            <li key={menu.link}>
              <Link to={menu.link}>{menu.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

const navMenuList = [
  { name: "메인", link: "/main" },
  { name: "이전 기록", link: "/history" },
];
