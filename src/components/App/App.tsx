import { useState } from "react";
import rappersArray from "../../../rappers/rappers.ts";
import type { Rapper } from "../../../types/types";
import Input from "../Input/Input";
import "./App.css";

function App() {
  const [rappers] = useState(rappersArray);
  const [selectedRappers, setSelectedRappers] = useState<Rapper[]>([]);
  const todaysRapper = rappers[0]; // for now

  return (
    <>
      <div className="logoContainer">Rapperdle</div>
      <Input
        rappers={rappers}
        selectedRappers={selectedRappers}
        setSelectedRappers={setSelectedRappers}
      />
      <div className="guessesContainer">guesses</div>
    </>
  );
}

export default App;
