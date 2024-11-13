import { useState } from "react";
import AnswerContainer from "../Answer container/AnswerContainer";
import QuestionContainer from "../Question container/QuestionContainer";
import "./enter-answers.css";

export default function EnterAnswers() {
  const [answerList, setAnwserList] = useState([]);
  return (
    <div>
      <QuestionContainer />
      <div className="answers-addition-section">
        <AnswerContainer />
        <button className="add-answers-button">Add answer</button>
      </div>
      <div className="answers-panel">
        <p>{answerList}</p>
      </div>
      <button className="add-enter-answers-question-button">
        Add question
      </button>
    </div>
  );
}
