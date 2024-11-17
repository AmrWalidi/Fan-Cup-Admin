import { useState } from "react";
import "./question-container.css";
import PropTypes from "prop-types";

export default function QuestionContainer({ handleQuestion, questionData }) {
  const [counter, setCounter] = useState(0);
  const characterCounter = (value) => {
    if (value.length <= 100) {
      setCounter(value.length);
      handleQuestion((prev) => ({
        ...prev,
        text: value,
      }));
    }
  };
  return (
    <div className="question-container">
      <textarea
        type="text"
        rows={2}
        placeholder="Question"
        onChange={(e) => characterCounter(e.target.value)}
        value={questionData.text}
      />
      <p className="counter">{counter}/100</p>
    </div>
  );
}

QuestionContainer.propTypes = {
  handleQuestion: PropTypes.func.isRequired,
  questionData: PropTypes.object.isRequired,
};
