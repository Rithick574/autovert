import "./index.css";
import App from "./App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "./store";
import { ThemeProvider } from "./context/theme-provider.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "./common/configurations.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <GoogleOAuthProvider clientId={`${GOOGLE_CLIENT_ID}`}>

      <ThemeProvider>
        <Toaster position="top-center" />
        <App />
      </ThemeProvider>
    </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);
