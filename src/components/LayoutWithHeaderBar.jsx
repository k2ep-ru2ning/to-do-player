import { Outlet } from "react-router-dom";
import HeaderBar from "./HeaderBar";

export default function LayoutWithHeaderBar() {
  return (
    <div className="space-y-4">
      <div className="bg-indigo-500 text-white">
        <div className="px-4 md:container mx-auto">
          <HeaderBar />
        </div>
      </div>
      <div className="px-4 md:container mx-auto">
        <Outlet />
      </div>
    </div>
  );
}
