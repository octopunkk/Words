import React from "react";
import "./Keyboard.css";

export function Keyboard(props) {
  let letters = [
    "Q,W,E,R,T,Y,U,I,O,P",
    "A,S,D,F,G,H,J,K,L",
    "ENTER,Z,X,C,V,B,N,M,BACK",
  ];

  let colorLetter = (letter) => {
    let color;
    if (props.testedLetters.some((l) => l === letter)) {
      color = "rgb(18, 18, 46)";
    }
    if (props.foundLetters.some((l) => l === letter)) {
      color = "#f57c00";
    }
    if (props.placedLetters.some((l) => l === letter)) {
      color = "#388e3c";
    }
    return color;
  };

  let handleClick = (event) => {
    console.log(event.target.id);
    props.handleKeyboard(event.target.id);
  };

  return (
    <div className="Keyboard">
      {letters.map((row, i) => (
        <div className={"row" + i}>
          {row.split(",").map((letter) => (
            <div
              onClick={handleClick}
              style={{ backgroundColor: colorLetter(letter) }}
              className="letter"
              id={letter}
            >
              {letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
