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

  // console.log('paramsToUpdate - ', paramsToUpdate);
  // console.log('newParams.toString() - ', newParams.toString());

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    newParams.set(key, value);
  });

  // console.log('newParams.toString() - ', newParams.toString());

  return newParams.toString();
}
