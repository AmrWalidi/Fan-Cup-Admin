import { useState } from "react";
import { db } from "../../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import QuestionContainer from "../Question container/QuestionContainer";
import "./enter-number.css";
import { toast } from "react-toastify";

export default function EnterNumber() {
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [number, setNumber] = useState(0);

  const changeAnswer = (value) => {
    setNumber(value);
    setCorrectAnswer([value.toString()]);
  };

  const sendQuestion = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Questions"), {
        question_type: 1,
        text: question,
        options: [""],
        correct_answer: correctAnswer,
        difficulty_level: difficulty,
      });
      toast.success("Question have been saved succeessfully", {
        position: "top-center",
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  return (
    <form onSubmit={sendQuestion}>
      <QuestionContainer handleQuestion={setQuestion} />
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          className="number-input"
          type="number"
          placeholder="Number"
          onChange={(e) => changeAnswer(e.target.value)}
          value={number}
        />
        <select
          className="difficulty-dropdown"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
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
        className="add-enter-number-question-button"
        value="Add question"
        type="submit"
      />
    </form>
  );
}
