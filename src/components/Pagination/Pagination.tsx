import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: Props) => {
  const numOfPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: numOfPages }, (_, i) => i + 1);
  const prevHandler = () => currentPage !== 0 && onPageChange(currentPage - 1);
  const nextHandler = () =>
    currentPage !== numOfPages - 1 && onPageChange(currentPage + 1);

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 0 && 'disabled'}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 0 ? 'true' : 'false'}
            onClick={prevHandler}
          >
            «
          </a>
        </li>
        {pages.map((num: number) => {
          return (
            <li
              className={`page-item ${num - 1 === currentPage && 'active'}`}
              key={num}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                href={`#${num}`}
                onClick={() => onPageChange(num - 1)}
              >
                {num}
              </a>
            </li>
          );
        })}
        <li
          className={`page-item ${currentPage === numOfPages - 1 && 'disabled'}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === numOfPages - 1 ? 'true' : 'false'}
            onClick={nextHandler}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
