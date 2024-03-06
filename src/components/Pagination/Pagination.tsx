import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (number: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);
  const pageNumbers = getNumbers(1, numberOfPages);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === numberOfPages;

  const paginateItems = () => {
    const allElements = getNumbers(1, total);
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;

    return allElements.slice(startIndex, endIndex);
  };

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${isFirstPage ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href={`#${currentPage}`}
            aria-disabled={isFirstPage ? 'true' : 'false'}
            onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>

        {pageNumbers.map(number => (
          <li
            className={`page-item ${currentPage === number ? 'active' : ''}`}
            key={number}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${number}`}
              onClick={() => onPageChange(number)}
            >
              {number}
            </a>
          </li>
        ))}

        <li className={`page-item ${isLastPage ? 'disabled' : ''}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href={`#${currentPage}`}
            aria-disabled={isLastPage ? 'true' : 'false'}
            onClick={() => !isLastPage && onPageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {paginateItems().map(number => (
          <li data-cy="item">{`Item ${number}`}</li>
        ))}
      </ul>
    </>
  );
};
