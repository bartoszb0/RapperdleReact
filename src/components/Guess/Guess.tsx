import type { GuessType } from "../../../types/types";
import "./Guess.css";

export default function Guess({
  rapper,
  ageComparison,
  debutComparison,
  monthlyComparison,
}: GuessType) {
  function displaySmallerOrBiggerSign(comparisonType: string) {
    if (comparisonType === "smaller") {
      return "↓";
    } else if (comparisonType === "bigger") {
      return "↑";
    }
  }

  return (
    <tr key={rapper.name}>
      <td className="tableName">{rapper.name}</td>
      <td className={ageComparison}>
        {rapper.age} {displaySmallerOrBiggerSign(ageComparison)}
      </td>
      <td>{rapper.genre}</td>
      <td>{rapper.from}</td>
      <td className={debutComparison}>
        {rapper.debut} {displaySmallerOrBiggerSign(debutComparison)}
      </td>
      <td className={monthlyComparison}>
        {rapper.monthly} {displaySmallerOrBiggerSign(monthlyComparison)}
      </td>
    </tr>
  );
}
