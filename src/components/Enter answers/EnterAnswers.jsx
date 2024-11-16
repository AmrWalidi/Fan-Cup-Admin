import { useState } from "react";
import AnswerContainer from "../Answer container/AnswerContainer";
import QuestionContainer from "../Question container/QuestionContainer";
import "./enter-answers.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from "react-toastify";

export default function EnterAnswers() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState();
  const [answerList, setAnwserList] = useState([]);
  const [difficulty, setDifficulty] = useState("");

  const addAnswer = () => {
    if (difficulty == "") {
      toast.error("select question difficultt", {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      setAnwserList([...answerList, answer]);
    }
  };

  const sendQuestion = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Questions"), {
        question_type: 3,
        text: question,
        options: [""],
        correct_answer: answerList,
        difficulty_level: difficulty,
      });
      toast.success("Question have been saved succeessfully", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div>
      <QuestionContainer handleQuestion={setQuestion} />
      <div className="answers-addition-section">
        <AnswerContainer correctAnswer={true} handleCorrectAnswer={setAnswer} />
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
        <button className="add-answers-button" onClick={addAnswer}>
          Add answer
        </button>
      </div>
      <div className="answers-panel">
        <p>{answerList.join(", ")}</p>
      </div>
      <button
        className="enter-answers-add-button"
        onClick={sendQuestion}
      >
        Add question
      </button>
    </div>
  );
}
