import React, {
  Dispatch, SetStateAction, useEffect, useState,
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
  const [isNextButton, setIsNextButton] = useState(false);
  const [isPrevButton, setIsPrevButton] = useState(false);
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
    setIsNextButton(page === pageNumbers.length);
    setIsPrevButton(page === 1);
  }, [currentPage]);

  const changePage = (direction: 'prev' | 'next') => {
    setCurrentPage(current => (
      direction === 'next' ? current + 1 : current - 1));
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: isPrevButton })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isPrevButton}
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
      <li className={classNames('page-item', { disabled: isNextButton })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isNextButton}
          onClick={() => changePage('next')}
        >
          »
        </a>
      </li>
    </ul>
  );
};
