import { useEffect, useState } from "react";
import type { GuessType, Rapper } from "../../types/types";
import "./Input.css";

type InputProps = {
  rappers: Rapper[];
  guessing: boolean;
  setGuessing: React.Dispatch<React.SetStateAction<boolean>>;
  gameWon: boolean;
  addNewGuess: (rapper: Rapper) => void;
  displayedGuesses: GuessType[];
};

export default function Input({
  rappers,
  guessing,
  setGuessing,
  gameWon,
  addNewGuess,
  displayedGuesses,
}: InputProps) {
  const [inputValue, setInputValue] = useState("");
  const [matches, setMatches] = useState<Rapper[]>([]);
  const [rapperNotFound, setRapperNotFound] = useState(false);

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
      setRapperNotFound(false);
      return;
    }

    const matches = rappers.filter(
      (rapper) =>
        !displayedGuesses.some((guess) => guess.rapper.name === rapper.name) &&
        rapper.name.toLowerCase().startsWith(inputValue.toLowerCase())
    );

    if (matches.length <= 0) {
      setRapperNotFound(true);
    }

    setMatches(matches);
  }, [inputValue]);

  function selectRapper(selectedRapper: Rapper) {
    setInputValue("");
    setGuessing(true);
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
          {rapperNotFound && <div className="notFound">Rapper not found</div>}
        </div>
      </div>
    </>
  );
}
