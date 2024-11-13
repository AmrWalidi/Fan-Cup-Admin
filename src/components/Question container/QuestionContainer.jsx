import { useState } from "react";
import './question-container.css'

export default function QuestionContainer() {
  const [counter, setCounter] = useState(0);
  const [question, setQestion] = useState("");
  const characterCounter = (value) => {
    if (value.length <= 100) {
      setCounter(value.length);
      setQestion(value);
    }
  };
  return (
    <div className="question-container">
      <textarea
        type="text"
        rows={2}
        placeholder="Question"
        onChange={(e) => characterCounter(e.target.value)}
        value={question}
      />
      <p className="counter">{counter}/100</p>
    </div>
  );
}