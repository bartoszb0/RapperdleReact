import type { Rapper } from "../../../types/types";
import "./Guesses.css";

type GuessesProps = {
  selectedRappers: Rapper[];
  todaysRapper: Rapper;
};

export default function Guesses({ selectedRappers }: GuessesProps) {
  const guessedRappersElement = selectedRappers.map((rapper) => {
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
