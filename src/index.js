import "react-alice-carousel/lib/alice-carousel.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CryptoContext from "./componants/CryptoContext";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <CryptoContext>
      <App />
    </CryptoContext>
  </StrictMode>
);
