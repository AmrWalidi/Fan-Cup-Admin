import PropTypes from "prop-types";
import logo from "/logo.svg";

export default function Header({ name }) {
  const dropdown = () => {
    const dropdown = document.getElementById("dropdown-panel");
    if (dropdown.style.maxHeight) {
      dropdown.style.maxHeight = null;
    } else {
      dropdown.style.maxHeight = dropdown.scrollHeight + "px";
    }
  };

  return (
    <div className="header">
      <img className="home-logo" src={logo} alt="Fan Cup logo" />
      <div className="profile-container" onClick={dropdown}>
        <p>{name}</p>
      </div>
    </div>
  );
}

Header.propTypes = {
  name: PropTypes.string,
};
