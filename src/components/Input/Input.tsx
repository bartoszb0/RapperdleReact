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
    return (
      <div className="foundMatch" key={match.name}>
        {match.name}
      </div>
    );
  });

  // On every input change filter matching rappers,
  // set matching rappers to none if there is no input
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
        <div className="matchesContainer">
          {matches.length > 0 && <div>{matchesElement}</div>}
        </div>
      </div>
    </>
  );
}
