import { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Input from "../../components/Input/Input";
import logo from "/logo.svg";
import "./login.css";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";

export default function Login() {
  const bodyStyle = {
    background: "linear-gradient(221deg, #B8F299 18.75%, #7CA096 76.81%)",
  };
  const body = document.getElementsByTagName("body")[0];
  Object.assign(body.style, bodyStyle);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          await updateDoc(doc(db, "Admins", user.uid), {
            remember_me: rememberMe,
          });
        }
      });
      window.location.href = "/home";
    } catch {
      toast.error("invalid credentials", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="login-container">
      <img className="logo" src={logo} alt="Fan Cup logo" />
      <p className="login-title">Login</p>
      <form className="login-input-fields" onSubmit={login}>
        <Input
          type="email"
          icon={faEnvelope}
          placeholder="Email"
          onUpdateInput={setEmail}
        />
        <Input
          type="password"
          icon={faLock}
          placeholder="Password"
          onUpdateInput={setPassword}
        />
        <div className="helpers">
          <div className="remember-me">
            <input
              type="checkbox"
              value={rememberMe}
              onChange={(e) => setRememberMe(e.target.value)}
            />
            <span> Remember Me</span>
          </div>
          <Link to="/forget-password" style={{ textDecoration: "none" }}>
            <div className="forget-password-button">
              <p>Forget Password?</p>
            </div>
          </Link>
        </div>
        <input className="login-button" value="login" type="submit" />
      </form>
    </div>
  );
}
