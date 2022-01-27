import "./App.css";

import React, { useState, useEffect } from "react";
import { Grid } from "../Grid/Grid";
import { AllWords } from "../../Data/AllWords";
import { CommonWords } from "../../Data/CommonWords";
import { GameOver } from "../GameOver/GameOver";
import Alert from "@mui/material/Alert";
import { Keyboard } from "../Keyboard/Keyboard";

let letterIndex = -1;
let timeEnd;
let testedLetters = [];
let foundLetters = [];
let placedLetters = [];

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
  const [isInvalid, setIsInvalid] = useState(false);

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
    testedLetters = [];
    foundLetters = [];
    placedLetters = [];
  };

  let isValid = (wordArray) => {
    let word = wordArray.join("");
    return AllWords.some((allWord) => allWord === word);
  };
  const testKeys = (l) => {
    if (l === "Backspace" || l === "Delete") {
      if (letterIndex !== -1) {
        setIsInvalid(false);
        setGameOverDisplay(() => false);
        setAlertDisplay(() => false);
        let newWords = [...words];
        newWords[rowIndex][letterIndex] = "";
        letterIndex -= 1;
        setWords(() => newWords);
        return;
      }
      return;
    }
    if (l === "Enter") {
      if (letterIndex === 4) {
        if (isValid(words[rowIndex])) {
          words[rowIndex].forEach((letter, i) => {
            testedLetters.push(letter);
            if (answer.split("").some((l) => l === letter)) {
              foundLetters.push(letter);
            }
            if (answer[i] === letter) {
              placedLetters.push(letter);
            }
          });
          if (words[rowIndex].toString().replaceAll(",", "") === answer) {
            timeEnd = Date.now();

            setWinStatus(() => true);
            setTimeout(() => setGameOverDisplay(true), 1000);
            setRowIndex((prev) => prev + 1);
            return;
          }
          setRowIndex((prev) => prev + 1);
          letterIndex = -1;
          if (rowIndex === 4) {
            timeEnd = Date.now();
            setTimeout(() => setGameOverDisplay(true), 1000);
            setWinStatus(() => false);
          }
        } else {
          setIsInvalid(true);
          setAlertDisplay(() => true);
        }
      }
      return;
    }
    if (letterIndex !== 4) {
      let newWords = [...words];
      letterIndex += 1;
      newWords[rowIndex][letterIndex] = l;
      setWords(() => newWords);
      return;
    }
  };

  const keyHandler = (event) => {
    if (
      event.key === "Backspace" ||
      event.key === "Delete" ||
      event.key === "Enter"
    ) {
      testKeys(event.key);
      return;
    }
    if (event.keyCode >= 60 && event.keyCode <= 90) {
      testKeys(event.key.toUpperCase());
      return;
    }
  };

  const handleKeyboard = (id) => {
    if (id === "BACK") {
      testKeys("Backspace");
      return;
    } else if (id === "ENTER") {
      testKeys("Enter");
      return;
    } else {
      testKeys(id);
      return;
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
      {gameOverDisplay && (
        <GameOver
          winStatus={winStatus}
          answer={answer}
          resetGame={resetGame}
          timeBegin={timeBegin}
          timeEnd={timeEnd}
        />
      )}
      <div className="filler"></div>

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
      <Grid
        key="grid"
        winStatus={winStatus}
        isInvalid={isInvalid}
        words={words}
        answer={answer}
        currentRow={rowIndex}
        placedLetters={placedLetters}
        foundLetters={foundLetters}
        testedLetters={testedLetters}
      />
      <div className="filler"></div>
      <Keyboard
        key="keyboard"
        handleKeyboard={handleKeyboard}
        placedLetters={placedLetters}
        foundLetters={foundLetters}
        testedLetters={testedLetters}
      />
      <div className="filler"></div>

      <p className="signature">Made with ❤️ by Anaïs, in Lyon</p>
    </div>
  );
}

export default App;
