import { FC, MouseEvent } from 'react';

import { getNumbers } from '../../utils';

type OnPageChange = (page: number) => void;

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: OnPageChange;
}

export const Pagination: FC<Props> = props => {
  const { total = 0, perPage, currentPage, onPageChange } = props;
  const numberOfPages = Math.ceil(total / perPage);

  const handlePageChange = (event: MouseEvent) => {
    const page = (event.target as HTMLElement).innerText;

    onPageChange(+page);
  };

  const handleArrowPageChange = (page: number, direction: string) => {
    if (page > 1 && direction === 'prev') {
      onPageChange(currentPage - 1);
    }

    if (page < numberOfPages && direction === 'next') {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage > 1 ? '' : 'disabled'}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => handleArrowPageChange(currentPage, 'prev')}
          >
            «
          </a>
        </li>
        {getNumbers(1, numberOfPages).map(item => (
          <li
            key={item}
            className={`page-item ${currentPage === item ? 'active' : ''}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${item}`}
              onClick={handlePageChange}
            >
              {item}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${currentPage < numberOfPages ? '' : 'disabled'}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === numberOfPages}
            onClick={() => handleArrowPageChange(currentPage, 'next')}
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {getNumbers(1, total)
          .slice((currentPage - 1) * perPage, currentPage * perPage)
          .map(item => (
            <li key={item} data-cy="item">
              {`Item ${item}`}
            </li>
          ))}
      </ul>
    </>
  );
};
