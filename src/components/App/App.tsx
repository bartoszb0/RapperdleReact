import { useState } from "react";
import rappersArray from "../../../rappers/rappers.ts";
import type { Rapper } from "../../../types/types";
import Guesses from "../Guesses/Guesses";
import Input from "../Input/Input";
import "./App.css";

function App() {
  const [rappers] = useState(rappersArray);
  const [selectedRappers, setSelectedRappers] = useState<Rapper[]>([]);
  const todaysRapper = rappers[0]; // for now
  const latestSelectedRapper = selectedRappers[0];

  return (
    <>
      <div className="logoContainer">Rapperdle</div>
      <Input
        rappers={rappers}
        selectedRappers={selectedRappers}
        setSelectedRappers={setSelectedRappers}
      />
      <Guesses selectedRappers={selectedRappers} todaysRapper={todaysRapper} />
    </>
  );
}

export default App;
