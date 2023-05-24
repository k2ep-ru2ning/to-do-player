import { Route, Routes } from "react-router-dom";

import GlobalErrorBoundary from "./components/global-error-boundary";
import Home from "./pages/home";
import Player from "./pages/player";
import NotFound from "./pages/not-found";

export default function App() {
  return (
    <GlobalErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player" element={<Player />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </GlobalErrorBoundary>
  );
}
