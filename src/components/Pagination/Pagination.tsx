import React from 'react';

function calcPagesCount(totalItems: number, sortCount: string): number {
  return Math.ceil(totalItems / Number(sortCount));
}

function createArrByNumber(num: number): number[] {
  const arr = [];

  for (let i = 1; i <= num; i++) {
    arr.push(i);
  }

  return arr;
}

interface PagionationProps {
  total: number;
  perPage: string;
  currentPage: number;
  onPageChange: (value: number) => void;
}

export const Pagination: React.FC<PagionationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = calcPagesCount(total, perPage);
  const arrToCreatePages = createArrByNumber(pagesCount);

  return (
    <>
      {/* #region list of pages */}
      <ul className="pagination">
        <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>
        {arrToCreatePages.map(num => (
          <li
            className={currentPage === num ? 'page-item active' : 'page-item'}
            key={num}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${num}`}
              onClick={() => onPageChange(num)}
            >
              {num}
            </a>
          </li>
        ))}
        <li
          className={
            currentPage === pagesCount ? 'page-item disabled' : 'page-item'
          }
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pagesCount}
            onClick={() =>
              currentPage !== pagesCount && onPageChange(currentPage + 1)
            }
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
