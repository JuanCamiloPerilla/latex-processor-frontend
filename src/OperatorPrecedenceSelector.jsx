import { useState } from "react";

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
    <div className="mb-4">
      <h2 className="font-semibold mb-2">Prioridad de operadores</h2>
      <ul>
        {operators.map((op, index) => (
          <li key={op} className="flex items-center gap-2 mb-1">
            <span className="w-8 text-center text-lg">{op}</span>
            <button onClick={() => moveUp(index)} className="px-2 py-1 text-sm bg-gray-200 rounded">⬆️</button>
            <button onClick={() => moveDown(index)} className="px-2 py-1 text-sm bg-gray-200 rounded">⬇️</button>
            <span className="text-sm text-gray-500">prioridad: {operators.length - index}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
