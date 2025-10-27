import type { GuessType, Rapper } from "../../types/types";
import Guess from "../Guess/Guess";
import "./Guesses.css";

type GuessesProps = {
  displayedGuesses: GuessType[];
  setGuessing: React.Dispatch<React.SetStateAction<boolean>>;
  setGameWon: React.Dispatch<React.SetStateAction<boolean>>;
  todaysRapper: Rapper;
};

export default function Guesses({
  displayedGuesses,
  setGuessing,
  setGameWon,
  todaysRapper,
}: GuessesProps) {
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
      setGameWon={setGameWon}
      todaysRapper={todaysRapper}
    />
  ));

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
