import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import EnterNumber from "../../components/Enter number/EnterNumber";
import MultipleChoice from "../../components/Multiple-choice/MultipleChoice";
import EnterAnswers from "../../components/Enter answers/EnterAnswers";
import logo from "/logo.svg";
import "./home.css";
import { toast } from "react-toastify";

export default function Home() {
  const bodyStyle = {
    background: "linear-gradient(180deg, #FFF 0%, #89B89C 100%)",
    minHeight: "100vh",
    margin: 0,
    padding: "10px 20px",
  };
  const body = document.getElementsByTagName("body")[0];
  Object.assign(body.style, bodyStyle);

  const location = useLocation();
  const [name, setName] = useState("");
  const [selectedItem, setSelectedItem] = useState("Enter a number");

  useEffect(() => {
    if (location.state != null) {
      const { passwordChangeMessage } = location.state;
      toast.success(passwordChangeMessage, {
        position: "top-center",
      });
    }
    location.state = null;
  }, [location]);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "Admins", user.uid);
      const res = await getDoc(docRef);
      if (res.exists()) {
        const userDetails = res.data();
        const nameArray = userDetails.name.split(" ");
        const nickname = nameArray[0][0] + nameArray[1][0];
        setName(nickname);
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const logout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
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
          <p>{name}</p>
        </div>
      </div>
      <div id="dropdown-panel">
        <Link to="/change-password" style={{ textDecoration: "none" }}>
          <div>
            <FontAwesomeIcon
              icon={faLock}
              style={{ fontSize: "22px", color: "#4B4B4B" }}
            />
            <p style={{ color: "#4B4B4B" }}>Change password</p>
          </div>
        </Link>
        <div onClick={logout}>
          <FontAwesomeIcon
            icon={faSignOut}
            style={{ fontSize: "22px", color: "#E94A4A" }}
          />
          <p style={{ color: "#E94A4A" }}>Logout</p>
        </div>
      </div>
      <div className="main-container">
        <div className="question-type-navbar">
          <p className="nav-items" onClick={(e) => setSelectedItem(e.target.textContent)}>
            Enter a number
          </p>
          <p className="nav-items" onClick={(e) => setSelectedItem(e.target.textContent)}>
            Multiple-choice
          </p>
          <p className="nav-items" onClick={(e) => setSelectedItem(e.target.textContent)}>
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
