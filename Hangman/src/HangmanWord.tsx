import React from "react";

interface Props {
  wordToGuess: string;
  setWordToGuess: React.Dispatch<React.SetStateAction<string>>;
  guessedLetters: string[];
  setGuessedLetters: React.Dispatch<React.SetStateAction<string[]>>;
}

const HangmanWord = ({ guessedLetters, setGuessedLetters, wordToGuess, setWordToGuess }: Props) => {
  //   const word = "hangman";
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        textTransform: "uppercase",
        fontSize: "3rem",
        fontWeight: "bold",
        fontFamily: "monospace",
      }}
    >
      {wordToGuess.split("").map((letter, index) => (
        <span style={{ borderBottom: "0.5rem solid black" }} key={index}>
          <span
            style={{
              visibility: guessedLetters.includes(letter) ? "visible" : "hidden",
            }}
          >
            <span>{letter}</span>
          </span>
        </span>
      ))}
    </div>
  );
};

export default HangmanWord;
