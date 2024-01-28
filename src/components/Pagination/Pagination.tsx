import classNames from 'classnames';
import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const arrOfPages: number[] = [];
  const pageCount: number = Math.ceil(total / +perPage);
  const isPrevLinkDisabled = currentPage === 1;
  const isNextLinkDisabled = currentPage === pageCount;

  for (let i = 1; i <= pageCount; i += 1) {
    arrOfPages.push(i);
  }

  const nextLinkClick = () => {
    if (!isNextLinkDisabled) {
      onPageChange(currentPage + 1);
    }
  };

  const prevLinkClick = () => {
    if (!isPrevLinkDisabled) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: isPrevLinkDisabled,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isPrevLinkDisabled}
          onClick={prevLinkClick}
        >
          «
        </a>
      </li>

      {arrOfPages.map((item) => (
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

      <li
        className={classNames('page-item', {
          disabled: isNextLinkDisabled,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isNextLinkDisabled}
          onClick={nextLinkClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
