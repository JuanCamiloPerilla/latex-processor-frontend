import React from "react";
import "./RewrittingStepsViewer.css";
import VerticalStack from "../vertical_stack/VerticalStack";
import HorizontalList from "../horizontal_list/HorizontalList";

const tokenColor = (type) => {
  switch (type) {
    case "operand": return "green";
    case "operator": return "blue";
    case "parenthesis": return "gray";
    default: return "black";
  }
};

const RewritingStepViewer = ({ steps }) => {
  return (
    <div className="postfix-panel">
      <h2>Conversión a Notación Postfija</h2>
      <p>
        Aquí se muestran los pasos de reescritura de la fórmula lógica en notación postfija.
        Cada paso incluye el token actual, la acción tomada, la pila de operadores y la cola de salida.
      </p>
      <div className="postfix-steps">
        {steps.map((step, index) => (
          <div key={index} className="postfix-step">
            <div className="step-details">
              <div className="step-number">
                Paso {index + 1}:
              </div>
              <div className="action-taken">
                {step.action}
              </div>
              {/* <VerticalStack className="operator-stack" items={step.stack} title="Pila" /> */}
              <div className="remaining-input">{step.remaining_input}</div>
              <div className="current-token">
                <div className="current-token-label">Token actual</div>
                <div className="current-token-value">
                  {step.input_token}
                </div>
              </div>
              <HorizontalList className="output-queue" items={step.output_queue} title="Cola de salida" />
              <HorizontalList className="stack" items={step.stack} title="Pila de Operadores" />
            </div>
            
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewritingStepViewer;
