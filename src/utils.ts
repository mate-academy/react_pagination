export function getNumbers(
  from: number,
  to: number,
): number[] {
  return Array(to - from + 1)
    .fill(0)
    .map((_, i) => i + from);
}
