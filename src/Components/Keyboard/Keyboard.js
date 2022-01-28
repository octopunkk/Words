import React from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import "./Keyboard.css";

export function Keyboard(props) {
  let letters = props.frenchMode
    ? ["A,Z,E,R,T,Y,U,I,O,P", "Q,S,D,F,G,H,J,K,L,M", "ENTER,W,X,C,V,B,N,BACK"]
    : ["Q,W,E,R,T,Y,U,I,O,P", "A,S,D,F,G,H,J,K,L", "ENTER,Z,X,C,V,B,N,M,BACK"];

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
    props.handleKeyboard(event.target.closest("div").id);
  };

  return (
    <div className="Keyboard">
      {letters.map((row, i) => (
        <div className={"row" + i}>
          {row.split(",").map((letter) => (
            <div
              key={letter}
              onClick={handleClick}
              style={{ backgroundColor: colorLetter(letter) }}
              className="letter"
              id={letter}
            >
              {letter === "BACK" && <BackspaceIcon />}
              {letter === "ENTER" && <KeyboardReturnIcon />}
              {letter !== "BACK" && letter !== "ENTER" && letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
