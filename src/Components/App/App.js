import "./App.css";
import { render } from "react-dom";
import React, { useState, useCallback, useEffect } from "react";
import { Grid } from "../Grid/Grid";
import { AllWords } from "../../Data/AllWords";
import { CommonWords } from "../../Data/CommonWords";
import Alert from "@mui/material/Alert";

let letterIndex = -1;

function App() {
  const [words, setWords] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const [alertDisplay, setAlertDisplay] = useState("none");
  const [rowIndex, setRowIndex] = useState(0);
  let pickAnswer = () => {
    let randomIndex = Math.floor(CommonWords.length * Math.random());
    let randomPick = CommonWords[randomIndex];
    return randomPick;
  };

  const [answer, setAnswer] = useState(pickAnswer());

  let isValid = (wordArray) => {
    let word = wordArray.join("");
    return AllWords.some((allWord) => allWord === word);
  };

  const keyHandler = (event) => {
    if (event.key === "Backspace" || event.key === "Delete") {
      if (letterIndex !== -1) {
        setAlertDisplay(() => "none");
        let newWords = [...words];
        newWords[rowIndex][letterIndex] = "";
        letterIndex -= 1;
        setWords(() => newWords);
      }
    }
    if (event.keyCode >= 60 && event.keyCode <= 90) {
      if (letterIndex !== 4) {
        let newWords = [...words];
        letterIndex += 1;
        newWords[rowIndex][letterIndex] = event.key.toUpperCase();
        setWords(() => newWords);
      }
    }
    if (event.key === "Enter") {
      if (letterIndex === 4) {
        if (isValid(words[rowIndex])) {
          if (words[rowIndex].toString("").replaceAll(",", "") === answer) {
            window.alert("Gagné !");
          }
          setRowIndex((prev) => prev + 1);
          letterIndex = -1;
          if (rowIndex === 5) {
            window.alert("Fin de partie !");
          }
        } else {
          setAlertDisplay(() => "content");
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyHandler, false);

    return () => {
      document.removeEventListener("keydown", keyHandler, false);
    };
  });

  return (
    <div className="App">
      <h1>Words !</h1>
      <Alert severity="error" variant="filled" sx={{ display: alertDisplay }}>
        Word not in word list !
      </Alert>
      <br />
      <Grid words={words} answer={answer} currentRow={rowIndex} />
    </div>
  );
}

export default App;
