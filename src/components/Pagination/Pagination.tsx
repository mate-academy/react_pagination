import React, {
  Dispatch, SetStateAction, useEffect,
} from 'react';
import classNames from 'classnames';

type Props = {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  total: number;
  perPage: number;
  currentPage: number,
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  setCurrentPage,
  total,
  perPage,
}) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i += 1) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    let page = currentPage;

    if (currentPage < 1) {
      page = 1;
    }

    if (currentPage > pageNumbers.length) {
      page = pageNumbers.length;
    }

    setCurrentPage(page);
  }, [currentPage]);

  const changePage = (direction: 'prev' | 'next') => {
    setCurrentPage(current => (
      direction === 'next' ? current + 1 : current - 1));
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => changePage('prev')}
        >
          «
        </a>
      </li>
      {pageNumbers.map(number => (
        <li
          className={classNames('page-item',
            currentPage === number ? 'active' : '')}
          key={number}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${number}`}
            onClick={() => {
              setCurrentPage(number);
            }}
          >
            {number}
          </a>
        </li>
      ))}
      <li className={classNames('page-item',
        { disabled: currentPage === pageNumbers.length })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageNumbers.length}
          onClick={() => changePage('next')}
        >
          »
        </a>
      </li>
    </ul>
  );
};
