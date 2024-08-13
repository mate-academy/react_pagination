export function maybeParseInt(str: string | null): number | null {
  if (!str) {
    return null;
  }

  return parseInt(str);
}
