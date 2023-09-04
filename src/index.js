import React from "react";
import ReactDOM from "react-dom/client";
import "./App.scss";
import App from "./App";
import SearchProvider from "./components/SearchProvider/SearchProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SearchProvider>
      <App />
    </SearchProvider>
  </React.StrictMode>
);
