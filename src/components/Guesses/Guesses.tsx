import { useEffect } from "react";
import type { Rapper } from "../../../types/types";
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
  const guessedRappersElement = guessedRappers.map((rapper) => {
    return (
      <tr key={rapper.name}>
        <td className="tableName">{rapper.name}</td>
        <td>{rapper.age}</td>
        <td>{rapper.genre}</td>
        <td>{rapper.from}</td>
        <td>{rapper.debut}</td>
        <td>{rapper.monthly}</td>
      </tr>
    );
  });

  // compare guessed rapper and render ui based off it
  useEffect(() => {
    if (guessedRappers.length <= 0) return;

    const guessedRapper = guessedRappers[0];

    if (guessedRapper.age === todaysRapper.age) {
      console.log(guessedRapper);
    }

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
