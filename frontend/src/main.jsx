import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastProvider } from "./context/ToastContext.jsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <BrowserRouter>
          <ToastProvider>
              <AuthProvider>
                  <App />
              </AuthProvider>
          </ToastProvider>
      </BrowserRouter>
  </StrictMode>
);
