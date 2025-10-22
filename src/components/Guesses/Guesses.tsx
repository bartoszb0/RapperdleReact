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
      genreComparison={guess.genreComparison}
      fromComparison={guess.fromComparison}
      debutComparison={guess.debutComparison}
      monthlyComparison={guess.monthlyComparison}
    />
  ));

  // TODO make number functions in the same one and add flag
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

    if (guessedRaperMonthly < todaysRapperMonthly) {
      return "bigger";
    } else if (guessedRaperMonthly > todaysRapperMonthly) {
      return "smaller";
    } else {
      return "perfect";
    }
  }

  function compareGenre(guessedRapper: Rapper) {
    // jezeli nic sie nie zgadza to return incorrect
    const matchingGenres = guessedRapper.genre.filter((eachGenre) =>
      todaysRapper.genre.includes(eachGenre)
    );

    console.log(guessedRapper.genre.length, todaysRapper.genre.length);

    if (matchingGenres.length === 0) {
      return "incorrect";
    }

    if (
      matchingGenres.length === todaysRapper.genre.length &&
      guessedRapper.genre.length === todaysRapper.genre.length
    ) {
      return "correct";
    }

    return "almostCorrect";
  }

  function compareFrom(guessedRapper: Rapper) {
    if (guessedRapper.from == todaysRapper.from) {
      return "correct";
    } else {
      return "incorrect";
    }
  }

  // compare guessed rapper and render ui based off it
  useEffect(() => {
    if (guessedRappers.length <= 0) return;

    const rapper = guessedRappers[0];

    const guess: GuessType = {
      rapper: rapper,
      ageComparison: compareAge(rapper),
      genreComparison: compareGenre(rapper),
      fromComparison: compareFrom(rapper),
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
