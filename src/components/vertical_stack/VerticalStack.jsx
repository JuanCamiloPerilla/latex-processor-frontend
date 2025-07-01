import React from "react";
import "./VerticalStack.css";

const VerticalStack = ({ className, items, title = "Stack" }) => {
  return (
    <div className={`stack-view ${className || ""}`}>
      <div className="vertical-stack">
        <div className="stack-header">
          {title}
        </div>
        {[...items].reverse().map((item, index) => (
          <div key={index} className="stack-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalStack;
