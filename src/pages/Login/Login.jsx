import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Input from "../../components/Input/Input";
import logo from "/logo.svg";
import "./login.css";
import { toast } from "react-toastify";

export default function Login() {
  const bodyStyle = {
    background: "linear-gradient(221deg, #B8F299 18.75%, #7CA096 76.81%)",
  };
  const body = document.getElementsByTagName("body")[0];
  Object.assign(body.style, bodyStyle);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const colRef = collection(db, "Admins"); // Replace 'users' with your collection name
      const q = query(colRef, where("email", "==", email));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/home");
      }

      else{
        toast.error("This user is not registered", {
          position: "top-center",
          autoClose: 2000,
        });
      }
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
