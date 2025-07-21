import React, { useEffect, useState } from 'react';
import TreeBuilder from './TreeBuilder';

function TreeStepsPage({ astSteps }) {
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);

  const handleNext = () => {
    setStepIndex(i => Math.min(i + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setStepIndex(i => Math.max(i - 1, 0));
  };

  useEffect(() => {
    if (astSteps && astSteps.length > 0) {
      setSteps(astSteps);
      setStepIndex(0);
    }
  }, [astSteps]);

  if (steps.length === 0) {
    return <div>No hay pasos disponibles.</div>;
  }

  if (stepIndex < 0 || stepIndex >= steps.length) {
    return <div>Índice de paso fuera de rango.</div>;
  }

  const currentStep = steps[stepIndex];

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Paso {stepIndex + 1} de {steps.length}</h2>
      <p>{currentStep?.description}</p>

      {currentStep?.current_tree ? (
        <TreeBuilder currentTree={currentStep.current_tree} stack={currentStep.stack} />
      ) : (
        <p>Cargando árbol...</p>
      )}

      <div style={{ marginTop: '1rem' }}>
        <button onClick={handlePrev} disabled={stepIndex === 0}>
          ⬅️ Anterior
        </button>
        <button onClick={handleNext} disabled={stepIndex >= steps.length - 1}>
          Siguiente ➡️
        </button>
      </div>
    </div>
  );
}

export default TreeStepsPage;