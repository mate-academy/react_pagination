import React from 'react';

export function getLinkDataCy(index: number, totalPages: number): string {
  switch (index) {
    case 0:
      return 'prevLink';
    case totalPages + 1:
      return 'nextLink';
    default:
      return 'pageLink';
  }
}

export function getLinkHref(index: number, totalPages: number): string {
  switch (index) {
    case 0:
      return '#prev';
    case totalPages + 1:
      return '#next';
    default:
      return `#${index}`;
  }
}

export function getLinkTextContent(index: number, totalPages: number): string {
  switch (index) {
    case 0:
      return '«';
    case totalPages + 1:
      return '»';
    default:
      return `${index}`;
  }
}

export function handleClickPagination(
  event: React.MouseEvent<HTMLUListElement>,
  currentPage: number,
  pagesAmount: number,
  onPageChange: (page: number) => void,
): void {
  const target = event.target as HTMLElement;
  const dataCYValue = target.getAttribute('data-cy');
  const currentPageNumber: number = Number(target.textContent);

  if (dataCYValue) {
    switch (dataCYValue) {
      case 'prevLink':
        if (currentPage !== 1) {
          onPageChange(currentPage - 1);
        }

        break;
      case 'nextLink':
        if (currentPage !== pagesAmount) {
          onPageChange(currentPage + 1);
        }

        break;
      case 'pageLink':
        onPageChange(currentPageNumber);
        break;
    }
  }
}
