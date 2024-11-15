import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ForgetPassword from "./pages/Forget Password/ForgetPassword";
import PasswordSent from "./pages/Password Sent/PasswordSent";
import ChangePassword from "./pages/Change Password/ChangePassword";
import "./index.css";
import { auth } from "./firebase/firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user.remember_me) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <Home /> : <Login />,
    },
    {
      path: "/home",
      element: <Home />,
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

  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}
