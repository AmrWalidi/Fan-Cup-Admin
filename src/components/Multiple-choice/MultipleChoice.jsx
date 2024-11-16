import { useState } from "react";
import { db } from "../../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import QuestionContainer from "../Question container/QuestionContainer";
import AnswerContainer from "../Answer container/AnswerContainer";
import "./multiple-choice.css";

export default function MultipleChoice() {
  const [question, setQuestion] = useState("");
  const [option_1, setOption_1] = useState("");
  const [option_2, setOption_2] = useState("");
  const [option_3, setOption_3] = useState("");
  const [option_4, setOption_4] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [difficulty, setDifficulty] = useState("");

  const sendQuestion = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Questions"), {
        question_type: 2,
        text: question,
        options: [option_1, option_2, option_3, option_4],
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
    <div>
      <QuestionContainer handleQuestion={setQuestion} />
      <form onSubmit={sendQuestion}>
        <div className="options">
          <AnswerContainer number={1} handleOption={setOption_1} />
          <AnswerContainer number={2} handleOption={setOption_2} />
          <AnswerContainer number={3} handleOption={setOption_3} />
          <AnswerContainer
            number={4}
            correctAnswer={true}
            handleOption={setOption_4}
            handleCorrectAnswer={setCorrectAnswer}
          />
        </div>
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
        <input
          className="multiple-choice-add-button"
          value="Add question"
          type="submit"
        />
      </form>
    </div>
  );
}
