export function makePagesArray(last, current) {
  const arr = [1];

  if (current > 3) {
    arr.push('...');
  }

  if (current > 2) {
    arr.push(current - 1);
  }

  if (current !== 1 && current !== last) {
    arr.push(current);
  }

  if (last - 1 > current) {
    arr.push(current + 1);
  }

  if (last - 2 > current) {
    arr.push('...');
  }

  if (last !== 1) {
    arr.push(last);
  }

  return arr;
}

export function makeEmojiArray(total) {
  return [...Array(total).keys()]
    .map(m => String.fromCodePoint(`${128512 + m}`));
}
