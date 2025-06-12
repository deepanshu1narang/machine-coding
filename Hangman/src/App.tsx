import "./App.css";
import { useState } from "react";
import generateRandomWord from "./generateRandomWord";
import HangmanDrawing from "./HangmanDrawing";
import HangmanWord from "./HangmanWord";
import Keyboard from "./Keyboard";

function App() {
  const [wordToGuess, setWordToGuess] = useState<string>(generateRandomWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter((l) => !wordToGuess.includes(l));
  const activeLetters = guessedLetters.filter((l) => wordToGuess.includes(l));

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess.split("").every((letter) => guessedLetters.includes(letter));

  const refreshGame = () => {
    setWordToGuess(generateRandomWord());
    setGuessedLetters([]);
  };

  return (
    <div className="app">
      <div className="result-div">
        <p className="result">{isWinner ? "Congrats... you won!" : isLoser ? "Better Luck Next Time!" : "Keep Guessing"}</p>
        <button disabled={!isLoser && !isWinner} className="refresh" onClick={refreshGame}>
          Change Word
        </button>
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord guessedLetters={guessedLetters} setGuessedLetters={setGuessedLetters} wordToGuess={wordToGuess} setWordToGuess={setWordToGuess} />
      {incorrectLetters.length >= 6 && wordToGuess}
      <Keyboard setGuessedLetters={setGuessedLetters} guessedLetters={guessedLetters} numberOfGuesses={incorrectLetters.length} incorrectLetters={incorrectLetters} activeLetters={activeLetters} isLoser={isLoser} isWinner={isWinner} />
    </div>
  );
}

export default App;
