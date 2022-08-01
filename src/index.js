import { AuthProvider } from "context/auth";
import { NotificationProvider } from "context/notification";
import { ShoppingCartProvider } from "context/shoppingCart";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import App from "./routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>

  <NotificationProvider>
    <AuthProvider>
      <ShoppingCartProvider>
        <App />
      </ShoppingCartProvider>
    </AuthProvider>
  </NotificationProvider>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
