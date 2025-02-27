import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/Input/Input";
import "./forget-password.css";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const bodyStyle = {
    background: "linear-gradient(221deg, #B8F299 18.75%, #7CA096 76.81%)",
  };
  const body = document.getElementsByTagName("body")[0];
  Object.assign(body.style, bodyStyle);

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const passwordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      navigate("/password-sent");
    } catch {
      toast.error("wrong email", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="forget-password-container">
      <FontAwesomeIcon
        icon={faLock}
        style={{ fontSize: "87px", color: "#302F2F" }}
      />
      <p className="forget-password-title">Forget Password ?</p>
      <p className="forget-password-subtitle ">
        You can reset your password here
      </p>
      <form onSubmit={passwordReset}>
        <Input
          type="email"
          icon={faEnvelope}
          placeholder="Email"
          onUpdateInput={setEmail}
        />
        <input
          className="send-password-button"
          value="Send password"
          type="submit"
        />
      </form>
    </div>
  );
}
