import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (v: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const numberOfPage: React.JSX.Element[] = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    const a = (
      <li
        className={`page-item ${currentPage === i ? 'active' : ''}`}
        onClick={() => onPageChange(i)}
        key={i}
      >
        <a data-cy="pageLink" className="page-link" href={`#${i}`}>
          {i}
        </a>
      </li>
    );

    numberOfPage.push(a);
  }

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 && 'true'}
            onClick={() =>
              currentPage !== 1 ? onPageChange(currentPage - 1) : null
            }
          >
            «
          </a>
        </li>
        {numberOfPage}
        <li
          className={`page-item ${currentPage === numberOfPage.length ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === numberOfPage.length && 'true'}
            onClick={() =>
              currentPage !== numberOfPage.length
                ? onPageChange(currentPage + 1)
                : null
            }
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
