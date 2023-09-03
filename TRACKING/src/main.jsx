import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { TrackingProvider } from "./Context/Tracking.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <TrackingProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </TrackingProvider>
  </>
);
