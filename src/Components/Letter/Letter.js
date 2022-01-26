import React from "react";
import "./Letter.css";

export function Letter(props) {
  let color = () => {
    let color = "rgb(34, 34, 68)";
    if (props.status === "placed") {
      color = "#66bb6a";
    }
    if (props.status === "found") {
      color = "#ffa726";
    }
    if (props.status === "notFound") {
      color = "rgb(22, 22, 46)";
    }
    return color;
  };
  let colorLetter = (letter) => {
    let color = "rgb(34, 34, 68)";
    if (props.status) {
      if (props.testedLetters.some((l) => l === letter)) {
        color = "rgb(22, 22, 46)";
      }
      if (props.foundLetters.some((l) => l === letter)) {
        color = "#ffa726";
      }
      if (props.placedLetters.some((l) => l === letter)) {
        color = "#66bb6a";
      }
    }

    return color;
  };

  return (
    <div className="letterBox" style={{ backgroundColor: color() }}>
      {props.letter}
    </div>
  );
}
