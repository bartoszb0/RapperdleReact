import type { Rapper } from "../../../types/types";

export function compareNumbers(
  guessedRapperValue: number,
  todaysRapperValue: number
) {
  if (guessedRapperValue < todaysRapperValue) {
    return "bigger";
  } else if (guessedRapperValue > todaysRapperValue) {
    return "smaller";
  } else {
    return "perfect";
  }
}

export function compareMonthly(guessedRapper: Rapper, todaysRapper: Rapper) {
  const guessedRaperMonthly = Number(guessedRapper.monthly.replace("M+", ""));
  const todaysRapperMonthly = Number(todaysRapper.monthly.replace("M+", ""));

  return compareNumbers(guessedRaperMonthly, todaysRapperMonthly);
}

export function compareGenre(guessedRapper: Rapper, todaysRapper: Rapper) {
  const matchingGenres = guessedRapper.genre.filter((eachGenre) =>
    todaysRapper.genre.includes(eachGenre)
  );

  console.log(guessedRapper.genre.length, todaysRapper.genre.length);

  if (matchingGenres.length === 0) {
    return "incorrect";
  }

  if (
    matchingGenres.length === todaysRapper.genre.length &&
    guessedRapper.genre.length === todaysRapper.genre.length
  ) {
    return "correct";
  }

  return "almostCorrect";
}

export function compareFrom(guessedRapper: Rapper, todaysRapper: Rapper) {
  if (guessedRapper.from == todaysRapper.from) {
    return "correct";
  } else {
    return "incorrect";
  }
}
