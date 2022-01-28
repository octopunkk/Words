import "./App.css";

import React, { useState, useEffect, useCallback } from "react";
import { Grid } from "../Grid/Grid";
import { AllWords } from "../../Data/AllWords";
import { CommonWords } from "../../Data/CommonWords";
import { FRAllWords } from "../../Data/FRAllWords";
import { FRCommonWords } from "../../Data/FRCommonWords";
import { GameOver } from "../GameOver/GameOver";
import Alert from "@mui/material/Alert";
import { Keyboard } from "../Keyboard/Keyboard";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ReactComponent as FrIcon } from "./france.svg";
import { ReactComponent as EnIcon } from "./united-kingdom.svg";

var classNames = require("classnames");

let letterIndex = -1;
let timeEnd;
let testedLetters = [];
let foundLetters = [];
let placedLetters = [];
let pickAnswer = (frenchMode) => {
  if (frenchMode) {
    let randomIndex = Math.floor(FRCommonWords.length * Math.random());
    let randomPick = FRCommonWords[randomIndex];
    return randomPick;
  } else {
    let randomIndex = Math.floor(CommonWords.length * Math.random());
    let randomPick = CommonWords[randomIndex];
    return randomPick;
  }
};
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
  const [funkyMode, setFunkymode] = useState(false);
  const [frenchMode, setFrenchMode] = useState(false);

  const [answer, setAnswer] = useState(pickAnswer(frenchMode));

  let resetGame = useCallback(() => {
    setWords([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);
    letterIndex = -1;
    setRowIndex(0);
    setAnswer(pickAnswer(frenchMode));
    setWinStatus();
    setGameOverDisplay(false);
    setTimeBegin(Date.now());
    testedLetters = [];
    foundLetters = [];
    placedLetters = [];
    setFunkymode(false);
  }, [frenchMode]);

  let isValid = (wordArray) => {
    let word = wordArray.join("");
    if (frenchMode) {
      return FRAllWords.some((allWord) => allWord === word);
    } else {
      return AllWords.some((allWord) => allWord === word);
    }
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
          if (words[rowIndex].toString().replaceAll(",", "") === "ANAIS") {
            setFunkymode(true);
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
  const handleGitClick = () => {
    window.open("https://github.com/octopunkk/Words");
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
  useEffect(() => {
    resetGame();
  }, [frenchMode, resetGame]);
  const AppClass = classNames("App", { wrapper: funkyMode });

  return (
    <div className={AppClass}>
      <GitHubIcon
        sx={{
          padding: "10px",
          color: "whitesmoke",
          cursor: "pointer",
          position: "absolute",
        }}
        onClick={handleGitClick}
      />
      {!frenchMode && (
        <FrIcon
          className="icon"
          onClick={() => {
            setFrenchMode(true);
          }}
        />
      )}
      {frenchMode && (
        <EnIcon
          className="icon"
          onClick={() => {
            setFrenchMode(false);
          }}
        />
      )}
      <h1>{frenchMode ? "Mots !" : "Words !"}</h1>
      {gameOverDisplay && (
        <GameOver
          frenchMode={frenchMode}
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
          {frenchMode
            ? "Mot non présent dans le dictionnaire"
            : "Word not in word list !"}
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
        funkyMode={funkyMode}
      />
      <div className="filler"></div>
      <Keyboard
        key="keyboard"
        handleKeyboard={handleKeyboard}
        placedLetters={placedLetters}
        foundLetters={foundLetters}
        testedLetters={testedLetters}
        frenchMode={frenchMode}
      />
      <div className="filler"></div>

      <p className="signature">Made with ❤️ by Anaïs, in Lyon</p>
    </div>
  );
}

export default App;
