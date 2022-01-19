import "./Word.css";
import React from "react";
import { Letter } from "../Letter/Letter";

export function Word(props) {
  let checkLetter = (letter, index) => {
    let answerArray = props.answer.split("");
    if (answerArray[index] === letter) {
      return "placed";
    }
    if (answerArray.some((a) => a === letter)) {
      for (let i = 0; i < index; i++) {
        if (props.word[i] === letter) {
          return "notFound";
        }
      }
      return "found";
    } else {
      return "notFound";
    }
  };

  return (
    <div className="Word">
      {props.word.map((letter, index) => {
        let status;
        if (props.wordRow < props.currentRow) {
          status = checkLetter(letter, index);
        }
        return <Letter letter={letter} status={status} />;
      })}
    </div>
  );
}
