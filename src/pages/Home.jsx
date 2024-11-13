import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import EnterNumber from "../components/Enter number/EnterNumber";
import MultipleChoice from "../components/Multiple-choice/MultipleChoice";
import EnterAnswers from "../components/Enter answers/EnterAnswers";
import logo from "/logo.svg";
import "../home.css";

export default function Home() {
  const location = useLocation();

  const { name } = location.state;
  const nameArray = name.split(" ");
  const charecter = nameArray[0][0] + nameArray[1][0];

  const [selectedItem, setSelectedItem] = useState("Enter a number");
  var [prevTranslateX, setPrevTranslate] = useState(0);

  const bodyStyle = {
    background: "linear-gradient(180deg, #FFF 0%, #89B89C 100%)",
    minHeight: "100vh",
    margin: 0,
    padding: "10px 20px",
  };
  const body = document.getElementsByTagName("body")[0];
  Object.assign(body.style, bodyStyle);

  const navigate = (section) => {
    setSelectedItem(section.textContent);
    const effect = document.getElementById("selected-nav-item");

    const effectRect = effect.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();

    const translateX = sectionRect.left - effectRect.left + prevTranslateX;
    effect.style.transform = `translate(${translateX + prevTranslateX}px, -5%)`;
    setPrevTranslate(translateX);
  };

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

  return (
    <div>
      <div className="header">
        <img className="home-logo" src={logo} alt="Fan Cup logo" />
        <div className="profile-container" onClick={dropdown}>
          <p>{charecter}</p>
        </div>
      </div>
      <div id="dropdown-panel">
        <Link to="change-password" style={{ textDecoration: "none" }}>
          <div>
            <FontAwesomeIcon
              icon={faLock}
              style={{ fontSize: "22px", color: "#4B4B4B" }}
            />
            <p style={{ color: "#4B4B4B" }}>Change password</p>
          </div>
        </Link>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <div>
            <FontAwesomeIcon
              icon={faSignOut}
              style={{ fontSize: "22px", color: "#E94A4A" }}
            />
            <p style={{ color: "#E94A4A" }}>Logout</p>
          </div>
        </Link>
      </div>
      <div className="main-container">
        <div className="questions-navbar">
          <div id="selected-nav-item"></div>
          <p className="nav-items" onClick={(e) => navigate(e.target)}>
            Enter a number
          </p>
          <p className="nav-items" onClick={(e) => navigate(e.target)}>
            Multiple-choice
          </p>
          <p className="nav-items" onClick={(e) => navigate(e.target)}>
            Enter answers
          </p>
        </div>
        {selectedItem == "Enter a number" ? (
          <EnterNumber />
        ) : selectedItem == "Multiple-choice" ? (
          <MultipleChoice />
        ) : (
          <EnterAnswers />
        )}
      </div>
    </div>
  );
}

Home.propTypes = {
  name: PropTypes.string.isRequired,
};
