import "./App.css";

import React, { useState, useEffect } from "react";
import { Grid } from "../Grid/Grid";
import { AllWords } from "../../Data/AllWords";
import { CommonWords } from "../../Data/CommonWords";
import { GameOver } from "../GameOver/GameOver";
import Alert from "@mui/material/Alert";

let letterIndex = -1;
let timeEnd;

function App() {
  const [words, setWords] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const [alertDisplay, setAlertDisplay] = useState(false);
  const [gameOverDisplay, setGameOverDisplay] = useState(false);
  const [rowIndex, setRowIndex] = useState(0);
  const [winStatus, setWinStatus] = useState(); //true if win, false if lose, undef else
  const [timeBegin, setTimeBegin] = useState(Date.now());

  let pickAnswer = () => {
    let randomIndex = Math.floor(CommonWords.length * Math.random());
    let randomPick = CommonWords[randomIndex];
    return randomPick;
  };

  const [answer, setAnswer] = useState(pickAnswer());

  let resetGame = () => {
    setWords([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);
    letterIndex = -1;
    setRowIndex(0);
    setAnswer(pickAnswer());
    setWinStatus();
    setGameOverDisplay(false);
    setTimeBegin(Date.now());
  };

  let isValid = (wordArray) => {
    let word = wordArray.join("");
    return AllWords.some((allWord) => allWord === word);
  };

  const keyHandler = (event) => {
    if (event.key === "Backspace" || event.key === "Delete") {
      if (letterIndex !== -1) {
        setGameOverDisplay(() => false);
        setAlertDisplay(() => false);
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
          if (words[rowIndex].toString().replaceAll(",", "") === answer) {
            timeEnd = Date.now();
            setWinStatus(() => true);
            setGameOverDisplay(() => true);
            return;
          }
          setRowIndex((prev) => prev + 1);
          letterIndex = -1;
          if (rowIndex === 4) {
            timeEnd = Date.now();
            setGameOverDisplay(() => true);
            setWinStatus(() => false);
          }
        } else {
          setAlertDisplay(() => true);
        }
      }
    }
  };

  // const timeBegin = useMemo(() => getTime());
  // useEffect(() => timeBegin= getTime(), []);
  useEffect(() => {
    document.addEventListener("keydown", keyHandler, false);

    return () => {
      document.removeEventListener("keydown", keyHandler, false);
    };
  });

  return (
    <div className="App">
      <h1>Words !</h1>
      {gameOverDisplay && (
        <GameOver
          winStatus={winStatus}
          answer={answer}
          resetGame={resetGame}
          timeBegin={timeBegin}
          timeEnd={timeEnd}
        />
      )}
      {alertDisplay && (
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: "50%", margin: "0 auto" }}
        >
          Word not in word list !
        </Alert>
      )}
      <br />
      <Grid words={words} answer={answer} currentRow={rowIndex} />
    </div>
  );
}

export default App;
