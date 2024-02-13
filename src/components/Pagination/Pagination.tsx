import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = (
  {
    total,
    perPage,
    currentPage,
    onPageChange,
  },
) => {
  const [prevLinkDisabled, setPrevLinkDisabled] = useState(true);
  const [nextLinkDisabled, setNextLinkDisabled] = useState(false);

  const numberOfPages = useMemo(() => {
    return Math.ceil(total / perPage);
  }, [perPage]);

  const allPages = useMemo(() => {
    return getNumbers(1, numberOfPages);
  }, [numberOfPages]);

  useEffect(() => {
    if (currentPage !== 1) {
      setPrevLinkDisabled(false);
    }

    if (currentPage === 1) {
      setPrevLinkDisabled(true);
    }

    if (currentPage === numberOfPages) {
      setNextLinkDisabled(true);
    }
  }, [currentPage, numberOfPages]);

  function handlePrevLinkClick() {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  }

  function handleNextLinkClick() {
    if (currentPage !== numberOfPages) {
      onPageChange(currentPage + 1);
    }
  }

  function handlePrevLinkKeyDown(event:
  React.KeyboardEvent<HTMLAnchorElement>) {
    if (event.key === 'Enter' && currentPage === 1) {
      event.preventDefault();
    }
  }

  function handleNextLinkKeyDown(event:
  React.KeyboardEvent<HTMLAnchorElement>) {
    if (event.key === 'Enter' && currentPage === numberOfPages) {
      event.preventDefault();
    }
  }

  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', {
            disabled: currentPage === 1,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={prevLinkDisabled}
            onClick={handlePrevLinkClick}
            onKeyDown={handlePrevLinkKeyDown}
          >
            «
          </a>
        </li>
        {allPages.map(pageNumber => (
          <li
            className={cn('page-item', {
              active: pageNumber === currentPage,
            })}
            key={pageNumber}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${pageNumber}`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </a>
          </li>
        ))}
        <li
          className={cn('page-item', {
            disabled: numberOfPages === currentPage,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={nextLinkDisabled}
            onClick={handleNextLinkClick}
            onKeyDown={handleNextLinkKeyDown}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
