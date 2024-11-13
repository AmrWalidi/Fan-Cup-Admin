import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../change-password.css";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const changePassword = () => {
    var savedPassword = "";
    if (oldPassword == savedPassword) {
      if (newPassword == repeatPassword) {
        savedPassword = newPassword;
        navigate("/");
      } else {
        console.log("new password is not the same as the repeated password");
      }
    } else {
      console.log("old password is incorrect");
    }
  };

  return (
    <div>
      <div className="change-password-main-container">
        <p className="change-password-title">Change Password</p>
        <div className="input-list">
          <div className="input-conatainer">
            <label htmlFor="old-password">Old Password</label>
            <input
              type="text"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="input-conatainer">
            <label htmlFor="new-password">New Password</label>
            <input
              type="text"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="input-conatainer">
            <label htmlFor="repeat-password">Repeat Password</label>
            <input
              type="text"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="change-password-button" onClick={changePassword}>
          Change Password
        </button>
      </div>
    </div>
  );
}
