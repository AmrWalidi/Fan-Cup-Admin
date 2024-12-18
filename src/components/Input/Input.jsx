import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import "./input.css";
import { useState } from "react";

export default function Input({ type, icon, placeholder, onUpdateInput }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onUpdateInput(newValue);
  };

  return (
    <div className="input-container">
      <div className="icon-container">
        <FontAwesomeIcon className="input-icon" icon={icon} color="#302F2F"  />
      </div>
      <input
        className="form-input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      />
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.object,
  placeholder: PropTypes.string,
  onUpdateInput: PropTypes.func,
};
