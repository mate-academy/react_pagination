/* eslint-disable no-plusplus */
export function makeLinks(current, last, way) {
  let links = [];

  if (last < 4) {
    for (let i = 1; i <= last; i++) {
      links.push(i);
    }
  } else if (+current >= last - 1) {
    links = [last - 2, last - 1, last];
  } else if (way === 'right') {
    links = [+current, +current + 1, last];
  } else if (current <= 2) {
    links = [1, 2, last];
  } else {
    links = [current - 1, current, last];
  }

  return links;
}
