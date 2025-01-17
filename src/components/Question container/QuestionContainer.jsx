import { useEffect, useState } from "react";
import "./question-container.css";
import PropTypes from "prop-types";

export default function QuestionContainer({
  handleQuestion,
  questionData,
  setSuccess,
  success,
}) {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    if (success) {
      setSuccess(false);
      setCounter(0);
    }
  }, [success, setSuccess]);

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
  setSuccess: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
};
