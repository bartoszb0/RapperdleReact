import { useEffect, useState } from "react";
import rappersArray from "../../../rappers/rappers.ts";
import type { Rapper } from "../../../types/types";
import Guesses from "../Guesses/Guesses";
import Input from "../Input/Input";
import WinScreen from "../WinScreen/WinScreen";
import "./App.css";

function App() {
  const [rappers] = useState(rappersArray);
  const [guessedRappers, setGuessedRappers] = useState<Rapper[]>([]);
  const [guessing, setGuessing] = useState(false);
  const todaysRapper = rappers[1]; // for now
  const [gameWon, setGameWon] = useState<boolean>(() => {
    const storedGameWon = localStorage.getItem("gameWon");
    return storedGameWon ? JSON.parse(storedGameWon) : false;
  });

  // probably should add here input ref to pass it
  // down to Guesses so its possible to focus on it after guessing

  // localStorage implementation

  useEffect(() => {
    localStorage.setItem("gameWon", JSON.stringify(gameWon));
  }, [guessedRappers, gameWon]);

  return (
    <>
      <div className="logoContainer">Rapperdle</div>
      {gameWon && <WinScreen />}
      <Input
        rappers={rappers}
        guessedRappers={guessedRappers}
        setGuessedRappers={setGuessedRappers}
        guessing={guessing}
        setGuessing={setGuessing}
        gameWon={gameWon}
      />
      <Guesses
        guessedRappers={guessedRappers}
        todaysRapper={todaysRapper}
        setGuessing={setGuessing}
        setGameWon={setGameWon}
      />
    </>
  );
}

export default App;
