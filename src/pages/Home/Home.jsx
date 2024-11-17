import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import Header from "../../components/header/Header";
import EnterNumber from "../../components/Enter number/EnterNumber";
import MultipleChoice from "../../components/Multiple-choice/MultipleChoice";
import EnterAnswers from "../../components/Enter answers/EnterAnswers";
import "./home.css";
import "../../components/header/header.css";
import { toast } from "react-toastify";

export default function Home() {
  const bodyStyle = {
    background: "linear-gradient(180deg, #FFF 0%, #89B89C 100%)",
    minHeight: "100vh",
    margin: 0,
    padding: "0 20px 60px",
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

  const selectItem = (e) => {
    const items = document.querySelectorAll(".nav-items");
    console.log(items)
    items.forEach((it) => it.classList.remove("selected-type"));
    e.target.classList.add("selected-type");
    setSelectedItem(e.target.textContent);
  };

  return (
    <div>
      <Header name={name} />

      <div className="main-container">
        <div className="question-type-navbar">
          <button className="nav-items selected-type" onClick={selectItem}>
            Enter a number
          </button>
          <button className="nav-items" onClick={selectItem}>
            Multiple-choice
          </button>
          <button className="nav-items" onClick={selectItem}>
            Enter answers
          </button>
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
