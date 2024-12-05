import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  numberOfPages: number;
  activePage: number;
  setActivePage(page: number): void;
};

export const Pagination: React.FC<Props> = ({
  numberOfPages,
  activePage,
  setActivePage,
}) => {
  const pages = getNumbers(1, numberOfPages);

  const prevLink = () => {
    if (activePage !== 1) {
      setActivePage(activePage - 1);
    }
  };

  const nextLink = () => {
    if (activePage !== numberOfPages) {
      setActivePage(activePage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={activePage === 1 ? 'page-item disabled' : 'page-item'}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={activePage === 1}
          onClick={prevLink}
        >
          «
        </a>
      </li>
      {pages.map(number => (
        <li
          className={activePage === number ? 'page-item active' : 'page-item'}
          key={number}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${number}`}
            onClick={() => setActivePage(number)}
          >
            {number}
          </a>
        </li>
      ))}

      <li
        className={
          activePage === numberOfPages ? 'page-item disabled' : 'page-item'
        }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={activePage === numberOfPages}
          onClick={nextLink}
        >
          »
        </a>
      </li>
    </ul>
  );
};
