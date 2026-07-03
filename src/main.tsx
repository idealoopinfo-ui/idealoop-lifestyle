import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.css";

import { ThemeProvider } from "./context/ThemeContext";
import { CountryProvider } from "./context/CountryContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <CountryProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CountryProvider>
    </ThemeProvider>
  </React.StrictMode>
);