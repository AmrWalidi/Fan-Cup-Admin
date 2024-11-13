import { useState } from "react";
import QuestionContainer from "../Question container/QuestionContainer";
import "./enter-number.css";

export default function EnterNumber() {
  const [number, setNumber] = useState(0);

  return (
    <div>
      <QuestionContainer />
      <input
        className="number-input"
        type="number"
        placeholder="Number"
        onChange={(e) => setNumber(e.target.value)}
        value={number}
      />
      <button className="add-enter-number-question-button">Add question</button>
    </div>
  );
}