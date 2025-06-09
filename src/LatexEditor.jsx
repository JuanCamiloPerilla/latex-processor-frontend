import React, { useState } from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import OperatorPrecedenceSelector from "./OperatorPrecedenceSelector";


export default function LatexEditor() {
  const [input, setInput] = useState('p \\rightarrow q \\leftrightarrow r \\lor ( s \\land p)');
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [priority, setPriority] = useState(["¬", "∧", "∨", "→", "↔"]);

  const handleChange = (e) => {
    setInput(e.target.value);
    setError(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/parse_formula", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latex: input, priority: priority}),
      });

      const data = await response.json();
      console.log("Response from backend:", data);
      setOutput(data.latex_result);
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="editor-container" style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h2>Editor LaTeX</h2>
      <OperatorPrecedenceSelector onChange={setPriority} />
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={5}
        cols={60}
        placeholder="Escribe tu fórmula LaTeX aquí"
        style={{ fontSize: '1rem', width: '100%', marginBottom: '1rem' }}
      />

      <h3>Vista previa:</h3>
      <div style={{ background: '#f0f0f0', padding: '1rem', color: '#333'}}>
        <BlockMath math={input} />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? "Procesando..." : "Enviar al backend"}
      </button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
           {output && (
        <div className="mt-6 border-t pt-4 text-black">
          <h2 className="font-semibold mb-2">Resultado del backend:</h2>
          <div className="bg-white p-4 border rounded">
            <BlockMath math={output} errorColor="#cc0000" />
          </div>
        </div>
      )}
    </div>
  );
}
