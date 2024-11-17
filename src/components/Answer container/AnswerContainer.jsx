import PropTypes from "prop-types";
import "./answer-container.css";

export default function AnswerContainer({
  number,
  questionData,
  correctAnswer,
  handleAnswers,
}) {
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
    console.log(questionData);
  };

  return (
    <div>
      <input
        type="text"
        placeholder={correctAnswer ? "Correct answer" : "Answer " + number}
        onChange={(e) => answerChange(e.target.value)}
        className={correctAnswer ? "answer correct-answer" : "answer"}
        value={
          number
            ? questionData.options[number - 1]
            : questionData.correct_answer
        }
      />
    </div>
  );
}

AnswerContainer.propTypes = {
  number: PropTypes.number,
  correctAnswer: PropTypes.bool,
  questionData: PropTypes.object,
  handleAnswers: PropTypes.func,
};
