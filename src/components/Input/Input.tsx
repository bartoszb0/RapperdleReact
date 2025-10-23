import { useEffect, useState } from "react";
import type { Rapper } from "../../../types/types";
import "./Input.css";

type InputProps = {
  rappers: Rapper[];
  guessedRappers: Rapper[];
  setGuessedRappers: React.Dispatch<React.SetStateAction<Rapper[]>>;
  guessing: boolean;
  setGuessing: React.Dispatch<React.SetStateAction<boolean>>;
  gameWon: boolean;
  addNewGuess: (rapper: Rapper) => void;
};

export default function Input({
  rappers,
  guessedRappers,
  setGuessedRappers,
  guessing,
  setGuessing,
  gameWon,
  addNewGuess,
}: InputProps) {
  const [inputValue, setInputValue] = useState("");
  const [matches, setMatches] = useState<Rapper[]>([]);

  const matchesElement = matches.map((match) => {
    return (
      <div
        className="foundMatch"
        key={match.name}
        onClick={() => selectRapper(match)}
      >
        {match.name}
      </div>
    );
  });

  // On every input filter matching rappers,
  // set matching rappers to none if there is no input
  useEffect(() => {
    if (!inputValue) {
      setMatches([]);
      return;
    }

    const matches = rappers.filter(
      (rapper) =>
        !guessedRappers.includes(rapper) &&
        rapper.name.toLowerCase().startsWith(inputValue.toLowerCase())
    );

    setMatches(matches);
  }, [inputValue]);

  function selectRapper(selectedRapper: Rapper) {
    setInputValue("");
    setGuessing(true);
    setGuessedRappers((prev) => [...prev, selectedRapper]);
    addNewGuess(selectedRapper);
  }

  // when user presses Enter when typing rapper's name
  function keyboardSelectRapper(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (matches.length <= 0) return;
    selectRapper(matches[0]);
  }

  return (
    <>
      <div className="inputMatchesContainer">
        <div className="inputContainer">
          <form onSubmit={(e) => keyboardSelectRapper(e)}>
            <input
              placeholder="Enter rapper's name..."
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              disabled={guessing || gameWon}
            ></input>
          </form>
        </div>
        <div className="matchesContainer">
          {matches.length > 0 && <div>{matchesElement}</div>}
        </div>
      </div>
    </>
  );
}
