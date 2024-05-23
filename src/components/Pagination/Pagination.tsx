import React from 'react';
import { Link } from 'react-router-dom';
import { ElementsPerPage } from '../../App';
import classNames from 'classnames';

interface Props {
  total: number;
  perPage: ElementsPerPage;
  currentPage: number;
  onPageChange: (arg: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const paginationCount: number[] = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    paginationCount.push(i);
  }

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: currentPage === 1 })}>
        <Link
          data-cy="prevLink"
          className={classNames('page-link', {
            'a[area-disabled="false"]': currentPage !== 1,
          })}
          to={`?page=${currentPage}&perPage=${perPage}`}
          aria-disabled="true"
          onClick={() => onPageChange(currentPage - 1)}
        >
          «
        </Link>
      </li>

      {paginationCount.map(count => (
        <li
          key={count.toString()}
          className={classNames('page-item', { active: currentPage === count })}
          onClick={() => onPageChange(count)}
        >
          <Link
            data-cy="pageLink"
            className="page-link"
            to={`?page=${currentPage}&perPage=${perPage}`}
          >
            {count}
          </Link>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: currentPage === paginationCount.length,
        })}
      >
        <Link
          data-cy="nextLink"
          className={classNames('page-link', {
            'a[area-disabled="true"]': currentPage === paginationCount.length,
          })}
          to={`?page=${currentPage}&perPage=${perPage}`}
          aria-disabled="false"
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </Link>
      </li>
    </ul>
  );
};
