import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ReactModal from "react-modal";
import { ChakraProvider } from "@chakra-ui/react";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
);

ReactModal.setAppElement("#root");
