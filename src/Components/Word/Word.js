import "./Word.css";
import React from "react";
import { Letter } from "../Letter/Letter";
var classNames = require("classnames");

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
  let wordClass = classNames("Word", { Invalid: props.isInvalid });

  return (
    <div className={wordClass}>
      {props.word.map((letter, index) => {
        let status;
        if (props.wordRow < props.currentRow) {
          status = checkLetter(letter, index);
        }
        return (
          <Letter
            key={index}
            index={index}
            winStatus={props.winStatus}
            letter={letter}
            status={status}
            placedLetters={props.placedLetters}
            foundLetters={props.foundLetters}
            testedLetters={props.testedLetters}
            funkyMode={props.funkyMode}
          />
        );
      })}
    </div>
  );
}
