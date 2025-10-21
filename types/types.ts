export type Rapper = {
  name: string;
  age: number;
  genre: string[];
  from: string;
  monthly: string;
  debut: number;
};

export type GuessType = {
  rapper: Rapper;
  ageComparison: "smaller" | "perfect" | "bigger";
  debutComparison: "smaller" | "perfect" | "bigger";
  monthlyComparison: "smaller" | "perfect" | "bigger";
};
