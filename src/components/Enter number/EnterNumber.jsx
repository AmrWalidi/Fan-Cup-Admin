import { useEffect, useState } from "react";
import QuestionContainer from "../Question container/QuestionContainer";
import "./enter-number.css";
import Multiselect from "multiselect-react-dropdown";
import PropTypes from "prop-types";

export default function EnterNumber({
  questionData,
  setQuestionData,
  categories,
}) {
  const [number, setNumber] = useState("");

  useEffect(() => {
    if (questionData.correct_answer[0] == "") {
      setNumber("");
    }
  }, [questionData.correct_answer]);

  const answerChange = (value) => {
    value = value.toString();
    setQuestionData((prev) => ({
      ...prev,
      correct_answer: [value],
    }));
    setNumber(value);
  };

  return (
    <div>
      <QuestionContainer
        handleQuestion={setQuestionData}
        questionData={questionData}
      />
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
            marginBottom: "10px",
            padding: "10px",
          },
        }}
      />
      <div className="answer-difficulty-container">
        <input
          className="numbered-answer"
          type="number"
          placeholder="Number"
          onChange={(e) => answerChange(e.target.value)}
          value={number}
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
    </div>
  );
}

EnterNumber.propTypes = {
  questionData: PropTypes.object,
  setQuestionData: PropTypes.func,
  categories: PropTypes.array,
};
