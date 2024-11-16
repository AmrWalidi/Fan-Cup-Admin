import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./password-sent.css";

export default function PasswordSent() {
  const bodyStyle = {
    background: "linear-gradient(221deg, #B8F299 18.75%, #7CA096 76.81%)",
  };
  const body = document.getElementsByTagName("body")[0];
  Object.assign(body.style, bodyStyle);

  return (
    <div className="password-sent-panel">
      <div className="check-container">
        <FontAwesomeIcon
          icon={faCheck}
          style={{ fontSize: "60px", color: "white" }}
        />
      </div>
      <p className="password-sent-title">Password Sent Successfully</p>
      <p className="password-sent-subtitle">You can login again here</p>
      <Link to="/login">
        <button className="login-button">login</button>
      </Link>
    </div>
  );
}
