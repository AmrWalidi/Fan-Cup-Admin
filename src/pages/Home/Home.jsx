import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import Header from "../../components/header/Header";
import EnterNumber from "../../components/Enter number/EnterNumber";
import MultipleChoice from "../../components/Multiple-choice/MultipleChoice";
import EnterAnswers from "../../components/Enter answers/EnterAnswers";
import "./home.css";
import "../../components/header/header.css";
import { toast } from "react-toastify";
import { checkInput, convertToLowerCase } from "../../functions/questions";

export default function Home() {
  const location = useLocation();
  const [name, setName] = useState("");
  const [selectedItem, setSelectedItem] = useState("Enter a number");
  const [categories, setCategories] = useState([]);
  const [questionData, setQuestionData] = useState({
    text: "",
    question_type: 0,
    options: [],
    correct_answer: [""],
    difficulty_level: "",
    categories: [],
  });
  const [bodyStyle, setBodyStyle] = useState({
    background: "linear-gradient(180deg, #FFF 0%, #89B89C 100%)",
    minHeight: "100vh",
    margin: 0,
    padding: "0 20px",
  });

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    Object.assign(body.style, bodyStyle);
  }, [bodyStyle]);

  const sendQuestion = async (e) => {
    e.preventDefault();
    const isValid = checkInput(questionData);

    if (isValid) {
      convertToLowerCase(questionData);
      try {
        if (selectedItem == "Enter a number") {
          questionData.question_type = 1;
        } else if (selectedItem == "Multiple-choice") {
          questionData.question_type = 2;
        } else {
          questionData.question_type = 3;
        }
        await addDoc(collection(db, "Questions"), questionData);
        toast.success("Question have been saved succeessfully", {
          position: "top-center",
        });
        setQuestionData({
          text: "",
          question_type: 0,
          options: [],
          correct_answer: [""],
          difficulty_level: "",
          categories: [],
        });
      } catch (error) {
        toast.error(error.message, {
          position: "top-center",
        });
      }
    } else {
      toast.error("Fill all fields", {
        position: "top-center",
      });
    }
  };

  const getCategories = async () => {
    try {
      const res = await getDocs(collection(db, "Category"));
      if (!res.empty) {
        const documnets = res.docs.map((doc) => ({
          ...doc.data(),
        }));
        setCategories(documnets);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

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
    items.forEach((it) => it.classList.remove("selected-type"));
    e.target.classList.add("selected-type");
    setSelectedItem(e.target.textContent);
    setBodyStyle((prev) => ({
      ...prev,
      padding: `0 20px${
        e.target.textContent == "Enter answers" ? " 90px" : ""
      }`,
    }));
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
          <EnterNumber
            questionData={questionData}
            setQuestionData={setQuestionData}
            categories={categories}
          />
        ) : selectedItem == "Multiple-choice" ? (
          <MultipleChoice
            questionData={questionData}
            setQuestionData={setQuestionData}
            categories={categories}
          />
        ) : (
          <EnterAnswers
            questionData={questionData}
            setQuestionData={setQuestionData}
            categories={categories}
          />
        )}
        <button className="add-question-button" onClick={sendQuestion}>
          Add question
        </button>
      </div>
    </div>
  );
}
