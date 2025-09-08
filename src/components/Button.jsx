import "../styles/Button.css";
import { useNavigate } from "react-router-dom";

export default function Button({ text, onClick }) {
  return (
    <button className="Button" onClick={onClick}>
      {text}
    </button>
  );
}
