export type SearchParams = {
  [key: string]: string,
};

export function getSearchWith(
  currentParams: URLSearchParams,
  paramsToUpdate: SearchParams,
): string {
  const newParams = new URLSearchParams(
    currentParams.toString(),
  );

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    newParams.set(key, value);
  });

  return newParams.toString();
}
