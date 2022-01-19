import React, { useState } from "react";
import "./Letter.css";

export function Letter(props) {
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

  return (
    <div className="letterBox" style={{ backgroundColor: color }}>
      {props.letter}
    </div>
  );
}
