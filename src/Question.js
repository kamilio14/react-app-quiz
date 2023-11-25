import React, { useState } from "react";

export default function Question(props) {
  return <h2 className="questions">{props.question.question}</h2>;
}
