import React, { useState } from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import OperatorPrecedenceSelector from "../operator_precendence_selector/OperatorPrecedenceSelector";
import RewrittingStepViewer from "../rewritting_steps_viewer/RewrittingStepViewer";
import TreeStepsPage from '../tree/TreeStepsPage';
import './LatexEditor.css';

const backendUrl = process.env.VITE_RAILS_API_URL || "http://localhost:3000";

export default function LatexEditor() {
  const [input, setInput] = useState('p \\rightarrow q \\leftrightarrow r \\lor ( s \\land p)');
  const [output, setOutput] = useState("");
  const [rewritingSteps, setRewritingSteps] = useState([]);
  const [astSteps, setAstSteps] = useState([]);
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
      const response = await fetch(`${backendUrl}/api/parse_formula`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latex: input, priority: priority}),
      });

      const data = await response.json();
      console.log("Response from backend:", data);
      setOutput(data.latex_result);
      setRewritingSteps(data.steps || []);
      setAstSteps(data.ast_steps || []);
      if (!response.ok) {
        throw new Error(data.error || "Error al procesar la fórmula");
      }
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="editor-container" style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h2>Conversor F.B.F.</h2>
      <p>
        Esta aplicación te permite escribir fórmulas lógicas en LaTeX y convertirlas en una forma bien formada. Lo logra a través de un proceso de reescritura a
        través del cual convierte primero la expresión a su forma postfije equivalente, luego construye un árbol de sintaxis y finalmente lo convierte a una 
        forma bien formada.
        <br />
      </p>
      <p>
        Escribe tu fórmula lógica en LaTeX. Puedes usar operadores como <code>¬</code>, <code>∧</code>, <code>∨</code>, <code>→</code>, <code>↔</code>.
      </p>

      <div className="input-panel">
        <div className="latex-input-container">
          <textarea
            className='latex-input-textarea'
            spellCheck="false"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu fórmula LaTeX aquí"
          />
        </div>
        <div className="latex-preview-container">
          <BlockMath math={input} />
        </div>
        <div className="submit-controls">
          <div className="instructions-container">
            <p>
              Al presionar el botón, la aplicación procesará la fórmula y mostrará los pasos de reescritura, el árbol de sintaxis y la fórmula bien formada resultante.
            </p>
          </div>
          <div className="precedence-selector-container">
            <OperatorPrecedenceSelector onChange={setPriority} />
          </div>
          <div className='submit-button-container'>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className=""
            >
              {loading ? "Procesando..." : "Procesar Fórmula"}
            </button>
          </div>
        </div>  
      </div>


      

      
      {error && <p className="mt-2 text-red-500">{error}</p>}
           {output && (
        <div className="mt-6 border-t pt-4 text-black">
          <h2 className="font-semibold mb-2">Fórmula Bien Formada:</h2>
          <div className="latex-preview-container">
            <BlockMath math={output} errorColor="#cc0000" />
          </div>
        </div>
      )}

      <div className='results-container'>
        <div className="postfix-result-container">
          <div className='postfix-rewriting-rules'>

          </div>
          <RewrittingStepViewer steps={rewritingSteps} className="mt-6">
            <h2 className="mt-6">Pasos de Reescritura</h2>
            <p>Los pasos de reescritura se mostrarán aquí una vez que se procese la fórmula.</p>
          </RewrittingStepViewer>
        </div>

        <TreeStepsPage astSteps={astSteps} className="mt-6">
          <h2 className="mt-6">Árbol de Sintaxis</h2>
          <p>Los pasos del árbol de sintaxis se mostrarán aquí una vez que se procese la fórmula.</p>
        </TreeStepsPage>
      </div>
      
    </div>
  );
}
