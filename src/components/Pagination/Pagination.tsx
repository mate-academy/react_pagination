import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const amountLinks = Math.ceil(total / perPage);
  const currentLinks = getNumbers(1, amountLinks);
  const isFirstLink = currentLinks[0] === currentPage;
  const isLastLink = currentLinks.at(-1) === currentPage;

  const handlePrevPageChange = () => {
    if (currentPage !== currentLinks[0]) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPageChange = () => {
    if (currentPage !== currentLinks.at(-1)) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: isFirstLink })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstLink}
          onClick={handlePrevPageChange}
        >
          «
        </a>
      </li>

      {currentLinks.map(link => {
        const isActive = link === currentPage;

        return (
          <li
            key={link}
            className={cn('page-item', {
              active: isActive,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${link}`}
              onClick={() => onPageChange(link)}
            >
              {link}
            </a>
          </li>
        );
      })}

      <li className={cn('page-item', { disabled: isLastLink })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastLink}
          onClick={handleNextPageChange}
        >
          »
        </a>
      </li>
    </ul>
  );
};
