// import { useState } from "react";

export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

// export const [showItems, setShowItems] = useState(5);
// export const [currentPage, setCuttentPage] = useState(1);
