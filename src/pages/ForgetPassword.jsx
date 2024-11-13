import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Input from "../components/Input/Input";
import "../forget-password.css";

function ForgetPassword() {
  const bodyStyle = {
    background: "linear-gradient(221deg, #B8F299 18.75%, #7CA096 76.81%)",
  };
  const body = document.getElementsByTagName("body")[0];
  Object.assign(body.style, bodyStyle);

  return (
    <div className="forget-password-panel">
      <FontAwesomeIcon
        icon={faLock}
        style={{ fontSize: "87px", color: "#302F2F" }}
      />
      <p className="forget-password-title">Forget Password ?</p>
      <p className="subtitle">You can reset your password here</p>
      <Input type="email" icon={faEnvelope} placeholder="Email" />
      <Link to="/password-sent">
        <button className="send-password-button">Send password</button>
      </Link>
    </div>
  );
}

export default ForgetPassword;
