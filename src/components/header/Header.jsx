import PropTypes from "prop-types";
import logo from "/logo.svg";
import { auth } from "../../firebase/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faSignOut, faList } from "@fortawesome/free-solid-svg-icons";
import "./header.css";

export default function Header({ name }) {
  const navigate = useNavigate();

  const dropdown = () => {
    const dropdown = document.getElementById("dropdown-panel");
    if (dropdown.style.maxHeight) {
      dropdown.style.maxHeight = null;
    } else {
      dropdown.style.maxHeight = dropdown.scrollHeight + "px";
    }
  };

  window.onclick = function (e) {
    const dropdown = document.getElementById("dropdown-panel");
    if (
      !(
        e.target.matches(".profile-container") ||
        e.target.matches(".profile-container p")
      )
    ) {
      dropdown.style.maxHeight = null;
    }
  };

  const navigateToChangePassword = () => {
    navigate("/change-password", {
      state: { name: name },
    });
  };

  const navigateToQuestionList = () => {
    navigate("/question-list", {
      state: { name: name },
    });
  };

  const logout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div>
      <div className="header">
        <img className="home-logo" src={logo} alt="Fan Cup logo" />
        <div className="profile-container" onClick={dropdown}>
          <p>{name}</p>
        </div>
      </div>
      <div id="dropdown-panel">
        <div onClick={navigateToQuestionList}>
          <FontAwesomeIcon
            icon={faList}
            style={{ fontSize: "22px", color: "#4B4B4B" }}
          />
          <p style={{ color: "#4B4B4B" }}>Questions</p>
        </div>
        <div onClick={navigateToChangePassword}>
          <FontAwesomeIcon
            icon={faLock}
            style={{ fontSize: "22px", color: "#4B4B4B" }}
          />
          <p style={{ color: "#4B4B4B" }}>Change password</p>
        </div>
        <div onClick={logout}>
          <FontAwesomeIcon
            icon={faSignOut}
            style={{ fontSize: "22px", color: "#E94A4A" }}
          />
          <p style={{ color: "#E94A4A" }}>Logout</p>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  name: PropTypes.string,
};
