import React from "react";
import "./Grid.css";
import { Word } from "../Word/Word";

export function Grid(props) {
  return (
    <div className="Grid">
      {props.words.map((word, i) => {
        return (
          <Word
            word={word}
            answer={props.answer}
            currentRow={props.currentRow}
            wordRow={i}
            placedLetters={props.placedLetters}
            foundLetters={props.foundLetters}
            testedLetters={props.testedLetters}
            isInvalid={props.isInvalid && props.currentRow === i}
            winStatus={props.winStatus && props.currentRow === i + 1}
          />
        );
      })}
    </div>
  );
}
