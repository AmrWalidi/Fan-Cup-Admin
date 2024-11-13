import QuestionContainer from "../Question container/QuestionContainer";
import AnswerContainer from "../Answer container/AnswerContainer";
import "./multiple-choice.css";
import { useState } from "react";

export default function MultipleChoice() {
  const [answers, setAnswers] = useState([])
  return (
    <div>
      <QuestionContainer />
      <div className="answers">
        <AnswerContainer number={1} />
        <AnswerContainer number={2} />
        <AnswerContainer number={3} />
        <AnswerContainer number={4} />
      </div>
      <button className="add-multiple-choice-question-button">Add question</button>
    </div>
  );
}