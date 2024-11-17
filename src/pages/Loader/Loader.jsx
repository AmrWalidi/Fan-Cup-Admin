import bouncing from "/bouncing-ball.gif";
import './loader.css'

export default function Loader() {
  const bodyStyle = {
    background: "#FCFCFC",
  };
  const body = document.getElementsByTagName("body")[0];
  Object.assign(body.style, bodyStyle);

  return (
    <div className="loading-container">
      <h1 className="brand">Fan Cup</h1>
      <img src={bouncing} />
    </div>
  );
}
