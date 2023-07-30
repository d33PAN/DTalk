import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthenticationContextProvider } from "./context/AuthenticationContext";
import { ChatContextProvider } from "./context/ChatContext";
import { UserContextProvider } from "../../../Ecommerce Site/client/src/context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <UserContextProvider>
  <AuthenticationContextProvider>
    <ChatContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChatContextProvider>
  </AuthenticationContextProvider>
    </UserContextProvider>
);
