import type { Rapper } from "../types/types";

export function getTodaysRapper(rappers: Rapper[]) {
  const today = new Date();
  const dateSeed =
    today.getFullYear() * 1000 + today.getMonth() * 50 + today.getDate();

  const index = dateSeed % rappers.length;

  return rappers[index];
}
