import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// @ts-ignore
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <App />
    </MantineProvider>
  </StrictMode>
);
