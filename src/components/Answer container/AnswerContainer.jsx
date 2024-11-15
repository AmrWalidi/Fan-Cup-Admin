import { useState } from "react";
import PropTypes from "prop-types";
import "./answer-container.css";

export default function AnswerContainer({
  number,
  correctAnswer,
  handleOption,
  handleCorrectAnswer,
}) {
  const [answer, setAnswer] = useState("");

  const answerChange = (value) => {
    setAnswer(value);
    if (correctAnswer) {
      handleCorrectAnswer(value);
    }
    handleOption(value);
  };
  return (
    <div>
      <input
        type="text"
        placeholder={
          number == undefined
            ? "Answer"
            : correctAnswer
            ? "correct answer"
            : "Answer " + number
        }
        onChange={(e) => answerChange(e.target.value)}
        className={correctAnswer ? "answer correct-answer" : "answer"}
        value={answer}
      />
    </div>
  );
}

AnswerContainer.propTypes = {
  number: PropTypes.number,
  options: PropTypes.array,
  handleOption: PropTypes.func,
  correctAnswer: PropTypes.bool,
  handleCorrectAnswer: PropTypes.func,
};
