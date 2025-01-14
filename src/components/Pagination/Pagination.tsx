import React from 'react';

type Props = {
  numberOfPages: number;
  activePage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  numberOfPages,
  activePage,
  onPageChange,
}) => {
  const paginationItems = [];

  for (let i = 1; i <= numberOfPages; i++) {
    paginationItems.push(
      <li
        key={i}
        className={`page-item ${activePage === i ? 'active' : ''}`}
        onClick={() => {
          if (activePage !== i) {
            onPageChange(i);
          }
        }}
      >
        <a href={`#page-${i}`} className="page-link" data-cy="pageLink">
          {i}
        </a>
      </li>,
    );
  }

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${activePage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={activePage === 1}
            onClick={e => {
              e.preventDefault();
              if (activePage > 1) {
                onPageChange(activePage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {paginationItems}
        <li
          className={`page-item ${activePage === numberOfPages ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={activePage === numberOfPages}
            onClick={e => {
              e.preventDefault();
              if (activePage < numberOfPages) {
                onPageChange(activePage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
