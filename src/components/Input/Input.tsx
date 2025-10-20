import { useEffect, useState } from "react";
import type { Rapper } from "../../../types/types";
import "./Input.css";

type InputProps = {
  rappers: Rapper[];
};

export default function Input({ rappers }: InputProps) {
  const [inputValue, setInputValue] = useState("");
  const [matches, setMatches] = useState<Rapper[]>([]);

  const matchesElement = matches.map((match) => {
    return <li key={match.name}>{match.name}</li>;
  });

  useEffect(() => {
    if (!inputValue) {
      setMatches([]);
      return;
    }

    const matches = rappers.filter((rapper) =>
      rapper.name.toLowerCase().startsWith(inputValue.toLowerCase())
    );

    setMatches(matches);
  }, [inputValue]);

  return (
    <>
      <div className="inputMatchesContainer">
        <div className="inputContainer">
          <input
            placeholder="Enter rapper's name..."
            onChange={(e) => setInputValue(e.target.value)}
          ></input>
        </div>
        {matchesElement.length > 0 && (
          <div className="matchesContainer">
            <ul>{matchesElement}</ul>
          </div>
        )}
      </div>
    </>
  );
}
