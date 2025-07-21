import { useState } from "react";
import "./OperatorPrecedenceSelector.css";

const DEFAULT_OPERATORS = ["¬", "∧", "∨", "→", "↔"];

export default function OperatorPrecedenceSelector({ onChange }) {
  const [operators, setOperators] = useState(DEFAULT_OPERATORS);

  const moveUp = (index) => {
    if (index === 0) return;
    const updated = [...operators];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setOperators(updated);
    onChange(updated); // notificar al padre
  };

  const moveDown = (index) => {
    if (index === operators.length - 1) return;
    const updated = [...operators];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setOperators(updated);
    onChange(updated); // notificar al padre
  };

  return (
    <div className="precedence-selector">
      <ul className="operator-priority-table">
        <li key={0}>
          <span className="operators-table-header">↑↓</span>
          <span className="operators-table-header">Operador</span>
          <span className="operators-table-header">prioridad</span>
        </li>
        {operators.map((op, index) => (
          <li key={op}>
            <div className="operators-table-row-buttons">
              <button onClick={() => moveUp(index)} className="operators-table-row-button-up">↑</button>
              <button onClick={() => moveDown(index)} className="operators-table-row-button-down">↓</button>
            </div>
            <span className="operators-table-row">{op}</span>
            <span className="operators-table-row">{operators.length - index}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
