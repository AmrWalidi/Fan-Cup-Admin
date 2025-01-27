import { useState } from "react";
import QuestionContainer from "../Question container/QuestionContainer";
import "./enter-answers.css";
import Multiselect from "multiselect-react-dropdown";
import PropTypes from "prop-types";

export default function EnterAnswers({
  questionData,
  setQuestionData,
  categories,
}) {
  const [correctAnswer, setCorrectAnswer] = useState("");
  const addAnswer = () => {
    setQuestionData((prev) => ({
      ...prev,
      correct_answer: [...prev.correct_answer, correctAnswer],
    }));
    setCorrectAnswer("");
  };

  return (
    <div>
      <QuestionContainer
        handleQuestion={setQuestionData}
        questionData={questionData}
      />
      <div className="answers-addition-section">
        <div>
          <input
            type="text"
            placeholder="Correct answer"
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="answer correct-answer"
            value={correctAnswer}
          />
        </div>
        <button className="add-answers-button" onClick={addAnswer}>
          Add answer
        </button>
      </div>
      <div className="answers-panel">
        <p>{questionData.correct_answer.join(", ")}</p>
      </div>
      <Multiselect
        options={categories}
        displayValue="name"
        placeholder="Select categories"
        selectedValues={categories.filter((cat) =>
          questionData.categories.includes(cat.id)
        )}
        onSelect={(selectedList) => {
          setQuestionData((prev) => ({
            ...prev,
            categories: selectedList.map((it) => it.id),
          }));
        }}
        onRemove={(selectedList) => {
          setQuestionData((prev) => ({
            ...prev,
            categories: selectedList.map((it) => it.id),
          }));
        }}
        style={{
          searchBox: {
            background: "#FCFCFC",
            color: "#4B4B4B",
            fontWeight: "bold",
            fontSize: "16px",
            marginTop: "10px",
            marginBottom: "10px",
            padding: "10px",
          },
        }}
      />
      <select
        className="difficulty-dropdown"
        value={questionData.difficulty_level}
        onChange={(e) =>
          setQuestionData((prev) => ({
            ...prev,
            difficulty_level: e.target.value,
          }))
        }
      >
        <option value="" disabled>
          -- Select question difficulty --
        </option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
        <option value="Super Hard">Super Hard</option>
      </select>
    </div>
  );
}

EnterAnswers.propTypes = {
  questionData: PropTypes.object,
  setQuestionData: PropTypes.func,
  categories: PropTypes.array,
};
