import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { auth } from "./firebase/firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ForgetPassword from "./pages/Forget Password/ForgetPassword";
import PasswordSent from "./pages/Password Sent/PasswordSent";
import ChangePassword from "./pages/Change Password/ChangePassword";
import Loader from "./pages/Loader/Loader";
import "./pages/Loader/loader.css";
import "./index.css";
import QuestionList from "./pages/Question List/QuestionList";

export default function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

      setLoading(false);
    });
  }, []);

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
    {
      path: "/question-list",
      element: <QuestionList />,
    },
  ]);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}
