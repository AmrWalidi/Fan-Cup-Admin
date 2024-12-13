import { useEffect, useState } from "react";
import AnswerContainer from "../Answer container/AnswerContainer";
import QuestionContainer from "../Question container/QuestionContainer";
import "./enter-answers.css";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from "react-toastify";
import Multiselect from "multiselect-react-dropdown";
import { checkInput, convertToLowerCase } from "../../functions/questions";

export default function EnterAnswers() {
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const addAnswer = () => {
    setCorrectAnswers([...correctAnswers, questionData.correct_answer[0]]);
  };

  const [questionData, setQuestionData] = useState({
    text: "",
    question_type: 3,
    options: [],
    correct_answer: [],
    difficulty_level: "",
    categories: [],
  });
  const [categories, setCategories] = useState();

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

  const updatedQuestionData = {
    ...questionData,
    correct_answer: correctAnswers,
  };

  const sendQuestion = async (e) => {
    e.preventDefault();
    const inValid = checkInput(updatedQuestionData);

    if (inValid) {
      convertToLowerCase(updatedQuestionData);
      try {
        await addDoc(collection(db, "Questions"), updatedQuestionData);
        toast.success("Question have been saved succeessfully", {
          position: "top-center",
        });
        setQuestionData({
          text: "",
          question_type: 3,
          options: [],
          correct_answer: [],
          difficulty_level: "",
          categories: [],
        });
        setCorrectAnswers([]);
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

  return (
    <div>
      <QuestionContainer
        handleQuestion={setQuestionData}
        questionData={questionData}
      />
      <div className="answers-addition-section">
        <AnswerContainer
          correctAnswer={true}
          handleAnswers={setQuestionData}
          questionData={questionData}
        />
        <button className="add-answers-button" onClick={addAnswer}>
          Add answer
        </button>
      </div>
      <div className="answers-panel">
        <p>{correctAnswers.join(", ")}</p>
      </div>
      <Multiselect
        options={categories}
        displayValue="name"
        placeholder="Select categories"
        onSelect={(selectedList) => {
          setQuestionData((prev) => ({
            ...prev,
            categories: selectedList.map((it) => it.id),
          }));
        }}
        onRemove={(selectedList) => {
          setQuestionData((prev) => ({
            ...prev,
            categories: selectedList.map((it) => it.id),
          }));
        }}
        style={{
          searchBox: {
            background: "#FCFCFC",
            color: "#4B4B4B",
            fontWeight: "bold",
            fontSize: "16px",
            marginTop: "10px",
            padding: "10px",
          },
        }}
      />
      <div className="difficulty-add-button-container">
        <select
          className="difficulty-dropdown"
          value={questionData.difficulty_level}
          onChange={(e) =>
            setQuestionData((prev) => ({
              ...prev,
              difficulty_level: e.target.value,
            }))
          }
        >
          <option value="" disabled>
            -- Select question difficulty --
          </option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
          <option value="Super Hard">Super Hard</option>
        </select>
        <button className="enter-answers-add-button" onClick={sendQuestion}>
          Add question
        </button>
      </div>
    </div>
  );
}
