import React from 'react';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPageCount: number = Math.ceil(total / perPage);
  const pageNumber: number[] = [];

  for (let i = 1; i <= totalPageCount; i += 1) {
    pageNumber.push(i);
  }

  const onNext = () => {
    if (currentPage !== (pageNumber.length)) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage !== pageNumber[0]) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === pageNumber[0] && 'disabled'}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={
              currentPage === (pageNumber.length - 1)
            }
            onClick={onPrevious}
          >
            «
          </a>
        </li>

        {pageNumber.map(number => (
          <li className={`page-item ${currentPage === number && 'active'}`} key={number}>
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

        <li className={`page-item ${currentPage === (pageNumber.length) && 'disabled'}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={
              currentPage === (pageNumber.length - 1)
            }
            onClick={() => onNext()}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
