import QuestionContainer from "../Question container/QuestionContainer";
import AnswerContainer from "../Answer container/AnswerContainer";
import "./multiple-choice.css";
import Multiselect from "multiselect-react-dropdown";
import PropTypes from "prop-types";

export default function MultipleChoice({
  questionData,
  setQuestionData,
  categories,
}) {
  return (
    <div>
      <QuestionContainer
        handleQuestion={setQuestionData}
        questionData={questionData}
      />
      <div className="options">
        <AnswerContainer
          number={1}
          handleAnswers={setQuestionData}
          questionData={questionData}
        />
        <AnswerContainer
          number={2}
          handleAnswers={setQuestionData}
          questionData={questionData}
        />
        <AnswerContainer
          number={3}
          handleAnswers={setQuestionData}
          questionData={questionData}
        />
        <AnswerContainer
          number={4}
          correctAnswer={true}
          handleAnswers={setQuestionData}
          questionData={questionData}
        />
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

MultipleChoice.propTypes = {
  questionData: PropTypes.object,
  setQuestionData: PropTypes.func,
  categories: PropTypes.array,
};
