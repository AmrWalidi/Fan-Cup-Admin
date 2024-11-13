import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import PasswordSent from "./pages/PasswordSent";
import ChangePassword from "./pages/ChangePassword";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },

  {
    path: "/password-sent",
    element: <PasswordSent />,
  },

  {
    path: "/change-password",
    element: <ChangePassword />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
