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
          />
        );
      })}
    </div>
  );
}
