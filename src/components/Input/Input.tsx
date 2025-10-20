import { useEffect, useState } from "react";
import type { Rapper } from "../../../types/types";
import "./Input.css";

type InputProps = {
  rappers: Rapper[];
  selectedRappers: Rapper[];
  setSelectedRappers: React.Dispatch<React.SetStateAction<Rapper[]>>;
};

export default function Input({
  rappers,
  selectedRappers,
  setSelectedRappers,
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
        !selectedRappers.includes(rapper) &&
        rapper.name.toLowerCase().startsWith(inputValue.toLowerCase())
    );

    setMatches(matches);
  }, [inputValue]);

  function selectRapper(selectedRapper: Rapper) {
    setInputValue("");
    setSelectedRappers((prev) => [...prev, selectedRapper]);
  }

  return (
    <>
      <div className="inputMatchesContainer">
        <div className="inputContainer">
          <input
            placeholder="Enter rapper's name..."
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          ></input>
        </div>
        <div className="matchesContainer">
          {matches.length > 0 && <div>{matchesElement}</div>}
        </div>
      </div>
    </>
  );
}
