export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const pagination = {
  page: 1,
  items: 5,
};

export const selectValues: { [key: string]: number } = {
  option1: 3,
  option2: 5,
  option3: 10,
  option4: 20,
};
