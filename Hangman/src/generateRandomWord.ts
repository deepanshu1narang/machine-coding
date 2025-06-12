import words from "./wordsList.json";
const generateRandomWord = (): string => {
  return words[Math.floor(Math.random() * words.length)];
};

export default generateRandomWord;
