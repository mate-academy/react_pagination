import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const amountOfLinks = Math.ceil(total / perPage);
  const currentLinks = getNumbers(1, amountOfLinks);
  const isFirstLink = currentLinks[0] === currentPage;
  const isLastLink = currentLinks.at(-1) === currentPage;

  const handlePrevPage = () => {
    if (currentPage !== currentLinks[0]) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage !== currentLinks.at(-1)) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item',
        { disabled: isFirstLink })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstLink}
          onClick={handlePrevPage}
        >
          «
        </a>
      </li>

      {currentLinks.map(link => {
        const isActive = link === currentPage;

        return (
          <li
            key={link}
            className={classNames('page-item',
              { active: isActive })}
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

      <li className="page-item">
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastLink}
          onClick={handleNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
