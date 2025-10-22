import { useEffect, useState } from "react";
import type { GuessType, Rapper } from "../../../types/types";
import Guess from "../Guess/Guess";
import {
  compareFrom,
  compareGenre,
  compareMonthly,
  compareNumbers,
} from "./compareFunctions";
import "./Guesses.css";

type GuessesProps = {
  guessedRappers: Rapper[];
  todaysRapper: Rapper;
  setGuessing: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Guesses({
  guessedRappers,
  todaysRapper,
  setGuessing,
}: GuessesProps) {
  const [displayedGuesses, setDisplayedGuesses] = useState<GuessType[]>([]);

  const guessedRappersElement = displayedGuesses.map((guess) => (
    <Guess
      key={guess.rapper.name}
      rapper={guess.rapper}
      ageComparison={guess.ageComparison}
      genreComparison={guess.genreComparison}
      fromComparison={guess.fromComparison}
      debutComparison={guess.debutComparison}
      monthlyComparison={guess.monthlyComparison}
      setGuessing={setGuessing}
    />
  ));

  // compare guessed rapper and render ui based off it
  useEffect(() => {
    if (guessedRappers.length <= 0) return;

    const rapper = guessedRappers[0];

    const guess: GuessType = {
      rapper: rapper,
      ageComparison: compareNumbers(rapper.age, todaysRapper.age),
      genreComparison: compareGenre(rapper, todaysRapper),
      fromComparison: compareFrom(rapper, todaysRapper),
      monthlyComparison: compareMonthly(rapper, todaysRapper),
      debutComparison: compareNumbers(rapper.debut, todaysRapper.debut),
    };

    setDisplayedGuesses((prev) => [guess, ...prev]);
  }, [guessedRappers]);

  return (
    <div className="guessesContainer">
      <table className="guessesTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Genre</th>
            <th>From</th>
            <th>Debut Year</th>
            <th>Monthly Listeners</th>
          </tr>
        </thead>
        <tbody>{guessedRappersElement}</tbody>
      </table>
    </div>
  );
}
