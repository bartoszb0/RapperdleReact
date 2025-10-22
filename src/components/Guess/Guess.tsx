import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { GuessType, Rapper } from "../../../types/types";
import "./Guess.css";

type GuessProps = GuessType & {
  setGuessing: React.Dispatch<React.SetStateAction<boolean>>;
  setGameWon: React.Dispatch<React.SetStateAction<boolean>>;
  todaysRapper: Rapper;
};

export default function Guess({
  rapper,
  ageComparison,
  genreComparison,
  fromComparison,
  debutComparison,
  monthlyComparison,
  setGuessing,
  setGameWon,
  todaysRapper,
}: GuessProps) {
  const [finishedMotionCount, setFinishedMotionCount] = useState(0);

  function displaySmallerOrBiggerSign(
    comparisonType: "smaller" | "bigger" | "perfect"
  ) {
    if (comparisonType === "smaller") {
      return "↓";
    } else if (comparisonType === "bigger") {
      return "↑";
    } else return "";
  }

  const cells = [
    { content: rapper.name, className: "tableName" },
    {
      content: `${rapper.age} ${displaySmallerOrBiggerSign(ageComparison)}`,
      className: ageComparison,
    },
    {
      content: `${rapper.genre.join(", ")}`,
      className: genreComparison,
    },
    { content: rapper.from, className: fromComparison },
    {
      content: `${rapper.debut} ${displaySmallerOrBiggerSign(debutComparison)}`,
      className: debutComparison,
    },
    {
      content: `${rapper.monthly} ${displaySmallerOrBiggerSign(
        monthlyComparison
      )}`,
      className: monthlyComparison,
    },
  ];

  useEffect(() => {
    if (finishedMotionCount === cells.length) {
      if (rapper === todaysRapper) {
        setGameWon(true);
      } else {
        setGuessing(false);
      }
    }
  }, [finishedMotionCount, cells.length]);

  return (
    <motion.tr
      key={rapper.name}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: { staggerChildren: 0.4 },
        },
      }}
    >
      {cells.map((cell, index) => (
        <motion.td
          key={index}
          className={cell.className}
          variants={{
            hidden: { opacity: 0, y: -10 },
            visible: { opacity: 1, y: 0 },
          }}
          onAnimationComplete={() => setFinishedMotionCount((prev) => prev + 1)}
        >
          {cell.content}
        </motion.td>
      ))}
    </motion.tr>
  );
}
