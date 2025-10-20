import { useState } from "react";
import rappersArray from "../../../rappers/rappers.ts";
import Input from "../Input/Input";
import "./App.css";

function App() {
  const [rappers] = useState(rappersArray);

  return (
    <>
      <div className="logoContainer">Rapperdle</div>
      <Input rappers={rappers} />
      <div className="guessesContainer">guesses</div>
    </>
  );
}

export default App;
