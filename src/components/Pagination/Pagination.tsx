import { type Page } from '../types/Props';
import React from 'react';
import { getNumbers } from '../../utils';
import classNames from 'classnames';

export const Pagination: React.FC<Page> = ({
  total,
  perPage,
  currentPage,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onPageChange,
}) => {
  const amountOfPages = Math.ceil(total / perPage);
  const allPages = getNumbers(1, amountOfPages);
  const prevIsAllowed = currentPage > 1;
  const nextIsAllowed = currentPage < amountOfPages;

  const handlePrevClick = () => {
    if (prevIsAllowed) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (nextIsAllowed) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li className={classNames('prev-item', { disabled: !prevIsAllowed })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href={`#${currentPage}`}
            aria-disabled={currentPage === 1 ? true : false}
            onClick={handlePrevClick}
          >
            «
          </a>
        </li>
        {allPages.map(item => (
          <li
            className={classNames('page-item', {
              active: currentPage === item,
            })}
            key={item}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${item}`}
              onClick={() => onPageChange(item)}
            >
              {item}
            </a>
          </li>
        ))}
        <li className={classNames('next-item', { disabled: !nextIsAllowed })}>
          <a
            data-cy="nextLink"
            className="page-link"
            href={`#${currentPage}`}
            aria-disabled={currentPage === 9 ? true : false}
            onClick={handleNextClick}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
