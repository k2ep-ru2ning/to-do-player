import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./app";
import customTheme from "./styles/custom-theme";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={customTheme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);
