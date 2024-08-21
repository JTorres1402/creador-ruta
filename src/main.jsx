import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MapWithRoute from "./MapWithRoute.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MapWithRoute />
  </StrictMode>
);
