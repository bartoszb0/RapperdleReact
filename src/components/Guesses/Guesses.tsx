import { useEffect, useState } from "react";
import type { GuessType, Rapper } from "../../../types/types";
import Guess from "../Guess/Guess";
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
      debutComparison={guess.debutComparison}
      monthlyComparison={guess.monthlyComparison}
    />
  ));

  function compareAge(guessedRapper: Rapper) {
    if (guessedRapper.age < todaysRapper.age) {
      return "bigger";
    } else if (guessedRapper.age > todaysRapper.age) {
      return "smaller";
    } else {
      return "perfect";
    }
  }

  function compareDebut(guessedRapper: Rapper) {
    if (guessedRapper.debut < todaysRapper.debut) {
      return "bigger";
    } else if (guessedRapper.debut > todaysRapper.debut) {
      return "smaller";
    } else {
      return "perfect";
    }
  }

  function compareMonthly(guessedRapper: Rapper) {
    const guessedRaperMonthly = Number(guessedRapper.monthly.replace("M+", ""));
    const todaysRapperMonthly = Number(todaysRapper.monthly.replace("M+", ""));

    console.log(guessedRaperMonthly, todaysRapperMonthly);

    if (guessedRaperMonthly < todaysRapperMonthly) {
      return "bigger";
    } else if (guessedRaperMonthly > todaysRapperMonthly) {
      return "smaller";
    } else {
      return "perfect";
    }
  }

  // compare guessed rapper and render ui based off it
  useEffect(() => {
    if (guessedRappers.length <= 0) return;

    const rapper = guessedRappers[0];

    const guess: GuessType = {
      rapper: rapper,
      ageComparison: compareAge(rapper),
      monthlyComparison: compareMonthly(rapper),
      debutComparison: compareDebut(rapper),
    };

    setDisplayedGuesses((prev) => [guess, ...prev]);
    setGuessing(false);
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
