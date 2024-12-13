import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./delete-message.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

export default function DeleteMessage({
  setDeleteMessage,
  setSelectDeleteQuestion,
}) {
  return (
    <div className="dark-overlay">
      <div className="delete-message-container">
        <div className="delete-message-title">
          <FontAwesomeIcon icon={faTrash} style={{ color: "#F64F4F" }} />
          <p>Question will be deleted</p>
        </div>
        <p className="delete-message-detail">
          This question will be delete permanently, are you sure you want to
          delete it?
        </p>
        <div className="button-list">
          <button
            className="cancel-button"
            onClick={() => setDeleteMessage(false)}
          >
            Cancel
          </button>
          <button
            className="delete-button"
            onClick={() =>
              setSelectDeleteQuestion((prev) => ({ ...prev, action: true }))
            }
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

DeleteMessage.propTypes = {
  setDeleteMessage: PropTypes.func,
  setSelectDeleteQuestion: PropTypes.func,
};
