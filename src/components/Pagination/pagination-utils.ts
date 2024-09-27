export function getLinkDataCy(index: number, totalPages: number): string {
  if (index === 0) {
    return 'prevLink';
  } else {
    return index === totalPages + 1 ? 'nextLink' : 'pageLink';
  }
}

export function getLinkHref(index: number, totalPages: number): string {
  if (index === 0) {
    return '#prev';
  } else {
    return index === totalPages + 1 ? '#next' : `#${index}`;
  }
}

export function getLinkTextContent(index: number, totalPages: number): string {
  if (index === 0) {
    return '«';
  } else {
    return index === totalPages + 1 ? '»' : `${index}`;
  }
}
