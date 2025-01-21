import PropTypes from "prop-types";
import "./answer-container.css";
import { useEffect, useState } from "react";

export default function AnswerContainer({
  number,
  questionData,
  correctAnswer,
  handleAnswers,
}) {
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (questionData.options.length == 0) {
      setAnswer("");
    }
  }, [questionData.options]);
  
  const answerChange = (value) => {
    if (correctAnswer) {
      handleAnswers((prev) => ({
        ...prev,
        correct_answer: [value],
      }));
    }
    handleAnswers((prev) => ({
      ...prev,
      options: number
        ? [
            ...prev.options.slice(0, number - 1),
            value,
            ...prev.options.slice(number),
          ]
        : [""],
    }));
    setAnswer(value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder={correctAnswer ? "Correct answer" : "Answer " + number}
        onChange={(e) => answerChange(e.target.value)}
        className={correctAnswer ? "answer correct-answer" : "answer"}
        value={answer}
      />
    </div>
  );
}

AnswerContainer.propTypes = {
  number: PropTypes.number,
  questionData: PropTypes.object,
  correctAnswer: PropTypes.bool,
  handleAnswers: PropTypes.func,
};
