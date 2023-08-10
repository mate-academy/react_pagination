import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number, // total number of items to paginate
  perPage: number, // optional with 1 by default
  perItems: number, // number of items per page
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perItems,
  perPage,
  onPageChange,
}) => {
  const amountPages = Math.ceil(total / perItems);
  const currentPage = getNumbers(1, amountPages);
  const prevPage = currentPage[0] === perPage;
  const nextPage = currentPage.at(-1) === perPage;

  const handlePrevPage = () => {
    if (perPage !== currentPage[0]) {
      onPageChange(perPage - 1);
    }
  };

  const handleNextPage = () => {
    if (perPage !== currentPage.at(-1)) {
      onPageChange(perPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: prevPage })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={prevPage}
          onClick={handlePrevPage}
        >
          «
        </a>
      </li>

      {currentPage.map((item) => {
        const isActive = item === perPage;

        return (
          <li
            key={item}
            className={cn('page-item', { active: isActive })}
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
        );
      })}

      <li className="page-item">
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={nextPage}
          onClick={handleNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
