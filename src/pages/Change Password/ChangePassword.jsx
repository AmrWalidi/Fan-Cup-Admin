import { useState } from "react";
import "./change-password.css";
import { auth } from "../../firebase/firebase";
import { toast } from "react-toastify";
import { reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth/web-extension";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const bodyStyle = {
    background: "linear-gradient(180deg, #FFF 0%, #89B89C 100%)",
    minHeight: "100vh",
    margin: 0,
    padding: "10px 20px",
  };
  const body = document.getElementsByTagName("body")[0];
  Object.assign(body.style, bodyStyle);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  const changePassword = (e) => {
    e.preventDefault();
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        if (newPassword != repeatPassword) {
          toast.error("new password is not the same as the repeated password", {
            position: "top-center",
          });
          return;
        }

        const credentials = EmailAuthProvider.credential(
          user.email,
          oldPassword
        );
        try {
          await reauthenticateWithCredential(user, credentials);
          await updatePassword(user, newPassword);
          navigate("/home", {
            state: { passwordChangeMessage: "password changed successfully" },
          });
        } catch {
          toast.error("old password is incorrect", {
            position: "top-center",
          });
        }
      }
    });
  };

  return (
    <div>
      <div className="change-password-main-container">
        <p className="change-password-title">Change Password</p>
        <form className="input-list" onSubmit={changePassword}>
          <div className="input-conatainer">
            <label htmlFor="old-password">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="input-conatainer">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="input-conatainer">
            <label htmlFor="repeat-password">Repeat Password</label>
            <input
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>

          <input
            className="change-password-button"
            value="Change Password"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}
