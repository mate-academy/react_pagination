export function getUrlNumericValue(key: string, defaultValue: number): number {
  const paramsString = window.location.search;
  const searchParams = new URLSearchParams(paramsString);
  const value = searchParams.get(key);

  if (!value || isNaN(+value) || +value <= 0) {
    return defaultValue;
  }

  return +value;
}
