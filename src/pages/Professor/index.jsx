import { useRef, useState } from "react";
// import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import arrowImg from "../../assets/arrow.svg";
import "./styles.css";

const turmas = [
  { id: 1, label: "4ºC", value: "4ºC" },
  { id: 2, label: "6ºB", value: "6ºB" },
  { id: 3, label: "8ºA", value: "4ºA" },
];

export function Professor() {
  const [date, setDate] = useState("");
  const dateInputRef = useRef(null);

  const handleChange = (e) => {
    setDate(e.target.value);
  };
  return (
    <div className="container">
      {
        <form>
          <div className="inputContainer">
            <label htmlFor="date">Data</label>
            <input
              type="date"
              name="date"
              id="date"
              ref={dateInputRef}
              onChange={handleChange}
            />
          </div>

          <div className="inputContainer">
            <label htmlFor="select">Turma</label>
            <select
              options={turmas.map((turma) => ({
                label: turma.label,
                value: turma.id,
              }))}
              onChange={(e) => setTurma(e.target.value)}
            />
          </div>
          <button className="button">
            <Link to="/presenca">Realizar Presença</Link>{" "}
            <img src={arrowImg} alt="->" />
          </button>
        </form>
      }
    </div>
  );
}
