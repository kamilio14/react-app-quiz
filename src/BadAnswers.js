import React, { useState } from "react";

export default function BadAnswers(props) {
  let styles;
  if (props.markCorrAns) {
    styles = {
      backgroundColor: props.isHeld ? "#FD8E3C" : "white",
      color: props.isHeld ? "white" : "black",
    };
  } else {
    styles = {
      backgroundColor: props.isHeld ? "#FF7BB6" : "white",
      color: "black",
    };
  }

  return (
    <button
      className="btns"
      style={styles}
      onClick={() => props.showId(props.id)}
    >
      {props.badAnswers}
    </button>
  );
}
