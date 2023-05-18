import { Route, Routes } from "react-router-dom";

import GlobalErrorBoundary from "./components/GlobalErrorBoundary";
import Home from "./pages/Home";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <GlobalErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </GlobalErrorBoundary>
  );
}
