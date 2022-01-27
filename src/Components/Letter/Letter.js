import React from "react";
import "./Letter.css";
import "animate.css";

var classNames = require("classnames");

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

  let letterClass = classNames(
    "letterBox",
    { Win: props.winStatus },
    { animate__bounceIn: props.status && !props.winStatus }
  );

  return (
    <div
      className={letterClass}
      style={{
        backgroundColor: color(),
        animationDelay: props.index * 0.1 + "s",
      }}
    >
      {props.letter}
    </div>
  );
}
