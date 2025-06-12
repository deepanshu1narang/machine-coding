import React, { useCallback, useEffect } from "react";
import { KEYS } from "./Keys";
import "./keyboard.css";

interface Props {
  guessedLetters: string[];
  setGuessedLetters: React.Dispatch<React.SetStateAction<string[]>>;
  numberOfGuesses: number;
  incorrectLetters: string[];
  activeLetters: string[];
  isLoser: boolean;
  isWinner: boolean;
}

const Keyboard = ({ guessedLetters, setGuessedLetters, incorrectLetters, activeLetters, isLoser, isWinner }: Props) => {
  const addGuessedLetters = useCallback(
    (key: string) => {
      if (guessedLetters.includes(key) || isLoser || isWinner) {
        return;
      } else {
        setGuessedLetters((guessedLetters) => [...guessedLetters, key]);
      }
    },
    [guessedLetters, isLoser, isWinner]
  );
  useEffect(() => {
    function fnKeyPress(e: KeyboardEvent): void {
      //   console.log(e.target);
      if (!e.key.match(/^[a-z]$/)) {
        console.log(e.key);
      } else {
        e.preventDefault();
        addGuessedLetters(e.key);
      }
    }
    // event delegation
    document.addEventListener("keydown", fnKeyPress);

    return () => {
      document.removeEventListener("keydown", fnKeyPress);
    };
  }, [guessedLetters]);

  const fnKeyClick = (key: string): void => {
    if (isWinner || isLoser) return;
    else {
      addGuessedLetters(key);
    }
  };

  return (
    <div className="keyboard" tabIndex={1}>
      {KEYS.map((key, index) => (
        <button disabled={incorrectLetters.includes(key)} key={index} onClick={() => fnKeyClick(key)} className={`key ${activeLetters.includes(key) && "activeLetters"}`}>
          {key}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;
