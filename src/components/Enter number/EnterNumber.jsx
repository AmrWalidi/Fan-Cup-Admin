import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import QuestionContainer from "../Question container/QuestionContainer";
import "./enter-number.css";
import { toast } from "react-toastify";
import Multiselect from "multiselect-react-dropdown";
import { checkInput, convertToLowerCase } from "../../functions/questions";

export default function EnterNumber() {
  const [questionData, setQuestionData] = useState({
    text: "",
    question_type: 1,
    options: [],
    correct_answer: [],
    difficulty_level: "",
    categories: [],
  });
  const [categories, setCategories] = useState([]);
  const [success, setSuccess] = useState(false);

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

  const sendQuestion = async (e) => {
    e.preventDefault();
    const isValid = checkInput(questionData);

    if (isValid) {
      convertToLowerCase(questionData);
      try {
        await addDoc(collection(db, "Questions"), questionData);
        toast.success("Question have been saved succeessfully", {
          position: "top-center",
        });
        setQuestionData({
          text: "",
          question_type: 1,
          options: [],
          correct_answer: [0],
          difficulty_level: "",
          categories: [],
        });
        setSuccess(true);
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
    <form onSubmit={sendQuestion}>
      <QuestionContainer
        handleQuestion={setQuestionData}
        questionData={questionData}
        success={success}
        setSuccess={setSuccess}
      />
      <Multiselect
        options={categories}
        displayValue="name"
        placeholder="Select categories"
        selectedValues={categories.filter((cat) =>
          questionData.categories.includes(cat.id)
        )}
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
            marginBottom: "10px",
            padding: "10px",
          },
        }}
      />
      <div className="answer-difficulty-container">
        <input
          className="numbered-answer"
          type="number"
          placeholder="Number"
          onChange={(e) =>
            setQuestionData((prev) => ({
              ...prev,
              correct_answer: [e.target.value.toString()],
            }))
          }
          value={questionData.correct_answer[0]}
        />
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
      </div>

      <input
        className="enter-number-add-button"
        value="Add question"
        type="submit"
      />
    </form>
  );
}
