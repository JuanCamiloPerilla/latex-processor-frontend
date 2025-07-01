import React from "react";
import "./HorizontalList.css";

const HorizontalList = ({ className, items, title = "Lista" }) => {
  return (
    <div className={`list-view ${className || ""}`}>
      <div className="horizontal-list">
        <div className="list-header">
          {title}
        </div>
        {items.map((item, index) => (
          <div key={index} className="list-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalList;
