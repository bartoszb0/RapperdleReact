import { useState } from "react";
import rappersArray from "../../../rappers/rappers.ts";
import type { Rapper } from "../../../types/types";
import Guesses from "../Guesses/Guesses";
import Input from "../Input/Input";
import "./App.css";

function App() {
  const [rappers] = useState(rappersArray);
  const [guessedRappers, setGuessedRappers] = useState<Rapper[]>([]);
  const [guessing, setGuessing] = useState(false);
  const todaysRapper = rappers[1]; // for now

  // probably should add here input ref to pass it
  // down to Guesses so its possible to focus on it after guessing

  return (
    <>
      <div className="logoContainer">Rapperdle</div>
      <Input
        rappers={rappers}
        guessedRappers={guessedRappers}
        setGuessedRappers={setGuessedRappers}
        guessing={guessing}
        setGuessing={setGuessing}
      />
      <Guesses
        guessedRappers={guessedRappers}
        todaysRapper={todaysRapper}
        setGuessing={setGuessing}
      />
    </>
  );
}

export default App;
