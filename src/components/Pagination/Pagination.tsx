import cn from 'classnames';
import React from 'react';
import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (tabNum: number) => void,
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const countTabs: number = Math.ceil(total / perPage);
  const tabNums = getNumbers(1, total);

  const handlePageChange = (tabNum: number) => {
    if (tabNum !== currentPage && tabNum > 0 && tabNum <= countTabs) {
      onPageChange(tabNum);
    }
  };

  return (
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
          aria-disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          «
        </a>
      </li>
      {tabNums.slice(0, countTabs).map((item, index) => (
        <li
          className={cn('page-item', {
            active: index + 1 === currentPage,
          })}
          key={item}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${index + 1}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </a>
        </li>
      ))}
      <li
        className={cn('page-item', {
          disabled: currentPage === countTabs,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === countTabs}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
