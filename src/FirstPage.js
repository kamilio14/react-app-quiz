import React from "react";
export default function firstPage(props) {
  return (
    <div className="open-card">
      <h1 className="header">Sport quiz</h1>
      <h3>This is a quiz you have to take</h3>
      <button onClick={props.setOpenedSecond} className="btn-1">
        Start quiz
      </button>
    </div>
  );
}
