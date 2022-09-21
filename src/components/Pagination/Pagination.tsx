import classNames from 'classnames';
import React from 'react';
import { getNumbers } from '../../utils';

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
  const totalPaginationPages = Math.ceil(total / perPage);
  const totalPaginationArray = getNumbers(1, totalPaginationPages);

  const handleClick = (item: number) => {
    if (item !== currentPage) {
      onPageChange(item);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: currentPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={currentPage === 1 && 'true'}
          onClick={() => {
            handleClick(currentPage - 1);
          }}
        >
          «
        </a>
      </li>

      {totalPaginationArray.map(item => (
        <li
          key={item}
          className={classNames('page-item',
            {
              active: item === currentPage,
            })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${item}`}
            onClick={() => {
              handleClick(item);
            }}
          >
            {item}
          </a>
        </li>
      ))}

      <li
        className={classNames('page-item ', {
          disabled: currentPage === totalPaginationPages,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={currentPage === totalPaginationPages && 'true'}
          onClick={() => {
            handleClick(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
