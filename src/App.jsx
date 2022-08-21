import { Route, Routes } from "react-router-dom";
import LayoutWithHeaderBar from "./components/LayoutWithHeaderBar";
import History from "./pages/History";
import Home from "./pages/Home";
import Main from "./pages/Main";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<LayoutWithHeaderBar />}>
        <Route path="main" element={<Main />} />
        <Route path="history" element={<History />} />
      </Route>
    </Routes>
  );
}
