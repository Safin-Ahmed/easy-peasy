import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StoreProvider } from "easy-peasy";
import store from "./store/index";
import "./global.css";
import Navbar from "./components/navbar/Navbar";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreProvider store={store}>
    <Navbar />
    <App />
  </StoreProvider>
);
