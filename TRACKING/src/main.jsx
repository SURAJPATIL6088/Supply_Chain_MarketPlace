import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { TrackingProvider } from "./Context/Tracking.jsx";
import { NavBar, Footer} from "./Components";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TrackingProvider>
      <NavBar />
      <App />
      <Footer />
    </TrackingProvider>
  </React.StrictMode>
);
