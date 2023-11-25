import React, { useState } from "react";

export default function GoodAnswer(props) {
  let styles;

  if (props.markCorrAns) {
    styles = {
      backgroundColor: props.isHeld ? "#FD8E3C" : "white",
      color: props.isHeld ? "black" : "black",
    };
  } else {
    styles = {
      backgroundColor: "#7EBA61",
    };
  }

  return (
    <button
      style={styles}
      className="btns"
      onClick={() => props.showId(props.id)}
    >
      {props.goodAnswer}
    </button>
  );
}
