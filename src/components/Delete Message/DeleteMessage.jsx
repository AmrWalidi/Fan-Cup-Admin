import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./delete-message.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function DeleteMessage() {
  return (
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
        <button className="cancel-button">Cancel</button>
        <button className="delete-button">Delete</button>
      </div>
    </div>
  );
}
