import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import "./WinScreen.css";

type WinScreenProps = {
  guessesCount: number;
};

export default function WinScreen({ guessesCount }: WinScreenProps) {
  const { width, height } = useWindowSize();
  return (
    <>
      <div>
        <h1>Congrats! It took you {guessesCount} attempts to guess.</h1>
        <h3>Come back tommorow for next rapper to guess!</h3>
      </div>
      <Confetti width={width} height={height} />
    </>
  );
}
