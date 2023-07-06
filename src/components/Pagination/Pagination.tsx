import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  handlePageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  handlePageChange,
}) => {
  const pageCount = Math.ceil(total / perPage);
  const pages = getNumbers(1, pageCount);

  const handleNext = () => {
    if (currentPage !== pageCount) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage !== 1) {
      handlePageChange(currentPage - 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={cn(
          'page-item',
          {
            disabled: currentPage === 1,
          },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handlePrev}
        >
          «
        </a>
      </li>

      {pages.map((item: number) => (
        <li
          className={cn(
            'page-item',
            { active: currentPage === item },
          )}
          key={item}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${item}`}
            onClick={() => handlePageChange(item)}
          >
            {item}
          </a>
        </li>
      ))}

      <li
        className={cn(
          'page-item',
          {
            disabled: currentPage === pageCount,
          },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageCount}
          onClick={handleNext}
        >
          »
        </a>
      </li>
    </ul>
  );
};
