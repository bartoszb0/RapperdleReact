import { useEffect, useState } from "react";
import rappersArray from "../../../rappers/rappers.ts";
import type { GuessType, Rapper } from "../../types/types.ts";
import { getTodaysRapper } from "../../utils/getTodaysRapper";
import {
  compareFrom,
  compareGenre,
  compareMonthly,
  compareNumbers,
} from "../Guesses/compareFunctions";
import Guesses from "../Guesses/Guesses";
import Input from "../Input/Input";
import WinScreen from "../WinScreen/WinScreen";
import "./App.css";

function App() {
  const [rappers] = useState(rappersArray);
  const [guessing, setGuessing] = useState(() => {
    const storedDisplayedGuesses = localStorage.getItem("displayedGuesses");
    return storedDisplayedGuesses ? true : false;
  });
  const todaysRapper = getTodaysRapper(rappers);
  console.log(todaysRapper);

  const [gameWon, setGameWon] = useState<boolean>(() => {
    const storedGameWon = localStorage.getItem("gameWon");
    return storedGameWon ? JSON.parse(storedGameWon) : false;
  });
  const [displayedGuesses, setDisplayedGuesses] = useState<GuessType[]>(() => {
    const storedDisplayedGuesses = localStorage.getItem("displayedGuesses");
    return storedDisplayedGuesses ? JSON.parse(storedDisplayedGuesses) : [];
  });

  // Reset localStorage everyday
  useEffect(() => {
    const today = new Date().toDateString();
    const lastReset = localStorage.getItem("lastResetDate");

    if (lastReset !== today) {
      localStorage.clear();
      setGameWon(false);
      setDisplayedGuesses([]);
      localStorage.setItem("lastResetDate", today);
    }
  }, []);

  // LocalStorage implementation
  useEffect(() => {
    localStorage.setItem("displayedGuesses", JSON.stringify(displayedGuesses));
    localStorage.setItem("gameWon", JSON.stringify(gameWon));
  }, [gameWon, displayedGuesses]);

  function addNewGuess(rapper: Rapper) {
    const guess: GuessType = {
      rapper: rapper,
      ageComparison: compareNumbers(rapper.age, todaysRapper.age),
      genreComparison: compareGenre(rapper, todaysRapper),
      fromComparison: compareFrom(rapper, todaysRapper),
      monthlyComparison: compareMonthly(rapper, todaysRapper),
      debutComparison: compareNumbers(rapper.debut, todaysRapper.debut),
    };
    setDisplayedGuesses((prev) => [guess, ...prev]);
  }

  return (
    <>
      <div className="logoContainer">Rapperdle</div>
      {gameWon ? (
        <WinScreen guessesCount={displayedGuesses.length} />
      ) : (
        <Input
          rappers={rappers}
          guessing={guessing}
          setGuessing={setGuessing}
          gameWon={gameWon}
          addNewGuess={addNewGuess}
          displayedGuesses={displayedGuesses}
        />
      )}
      <Guesses
        displayedGuesses={displayedGuesses}
        setGuessing={setGuessing}
        setGameWon={setGameWon}
        todaysRapper={todaysRapper}
      />
    </>
  );
}

export default App;
