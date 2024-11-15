import "./index.css";
import App from "./App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { persistor, store } from "./store";
import { ThemeProvider } from "./context/theme-provider.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID, SITE_KEY } from "./common/configurations.tsx";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <GoogleOAuthProvider clientId={`${GOOGLE_CLIENT_ID}`}>
          <GoogleReCaptchaProvider reCaptchaKey={SITE_KEY}>
            <Toaster position="top-center" />
            <PersistGate loading={null} persistor={persistor}></PersistGate>
            <App />
          </GoogleReCaptchaProvider>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
