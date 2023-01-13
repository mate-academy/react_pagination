export function getPages(n: number): number[] {
  const pages: number[] = [];

  for (let i = 1; i <= n; i += 1) {
    pages.push(i);
  }

  return pages;
}
