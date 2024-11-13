import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Input from "../components/Input/Input";
import logo from "/logo.svg";
import "../login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const bodyStyle = {
    background: "linear-gradient(221deg, #B8F299 18.75%, #7CA096 76.81%)",
  };
  const body = document.getElementsByTagName("body")[0];
  Object.assign(body.style, bodyStyle);

  const login = () => {
    const valid = false;
    if (valid) {
      const homeProps = { name: "Amr Walidi" };
      navigate("/", { state: homeProps });
    } else {
      console.log("wrong password or email");
    }
  };

  return (
    <div className="login-panel">
      <img className="logo" src={logo} alt="Fan Cup logo" />
      <p className="title">Login</p>
      <div className="input-fields">
        <Input
          type="email"
          icon={faEnvelope}
          placeholder="Email"
          value={email}
          onChage={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          icon={faLock}
          placeholder="Password"
          value={password}
          onChage={(e) => setPassword(e.target.password)}
        />
      </div>
      <div className="helpers">
        <div className="remember-me">
          <input type="checkbox" />
          <span> Remember Me</span>
        </div>
        <Link to="/forget-password" style={{ textDecoration: "none" }}>
          <div className="forget-password-button">
            <p>Forget Password?</p>
          </div>
        </Link>
      </div>
      <button className="login-button" onClick={login}>
        login
      </button>
    </div>
  );
}