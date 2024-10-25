import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes/routes";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "./redux/store";
import NotificationManager from "./components/notification/NotificationManager";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <NotificationManager />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
