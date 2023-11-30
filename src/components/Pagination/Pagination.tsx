import React from 'react';

type SetPageCallback = (num: number) => number;

interface Props {
  pageCount: number,
  activePage: number,
  setPage: (value: number | SetPageCallback) => void;
}

export const Pagination: React.FC<Props> = ({
  setPage,
  pageCount,
  activePage,
}) => {
  return (
    <ul className="pagination">
      <li className={`page-item ${activePage === 1 && 'disabled'}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={activePage === 1 && 'true'}
          onClick={() => (
            setPage(prevPage => (prevPage <= 1 ? prevPage : prevPage - 1))
          )}
        >
          «
        </a>
      </li>

      {Array.from({ length: pageCount }, (_, index) => (
        <li className={`page-item ${activePage === index + 1 && 'active'}`}>
          <a
            onClick={() => setPage(index + 1)}
            data-cy="pageLink"
            className="page-link"
            href={`#${index + 1}`}
          >
            {index + 1}
          </a>
        </li>
      ))}

      <li className={`page-item ${activePage === pageCount && 'disabled'}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={activePage === pageCount && 'true'}
          onClick={() => (
            setPage(prevPage => (
              prevPage >= pageCount ? prevPage : prevPage + 1
            ))
          )}
        >
          »
        </a>
      </li>
    </ul>
  );
};
