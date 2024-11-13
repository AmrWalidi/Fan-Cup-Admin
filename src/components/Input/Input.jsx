import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import './input.css'
function Input({ type, icon, placeholder }) {
  return (
    <div className="input-container">
      <div className="icon-container">
        <FontAwesomeIcon icon={icon} color="#302F2F" size={24}/>
      </div>
      <input type={type} placeholder={placeholder} />
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.element,
  placeholder: PropTypes.string,
};

export default Input;
