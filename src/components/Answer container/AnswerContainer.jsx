import { useState } from "react";
import PropTypes from "prop-types";
import './answer-container.css'

export default function AnswerContainer({ number }) {
  const [answer, setAnswer] = useState("");
  return (
    <div>
      <input
        className="answer"
        type="text"
        placeholder= {number == undefined ? "Answer" : "Answer " + number}
        onChange={(e) => setAnswer(e.target.value)}
        value={answer}
      />
    </div>
  );
}

AnswerContainer.propTypes = {
  number: PropTypes.number,
};

